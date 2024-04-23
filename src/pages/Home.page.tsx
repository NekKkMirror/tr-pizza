import {
  CategoriesComponent,
  SortComponent,
  PizzaBlockComponent,
  PizzaSkeletonComponent,
  PaginationComponent,
} from '@CMP'
import {
  useAppDispatch,
  selectFilter,
  selectPizzas,
  setCategoryId,
  setCurrentPage,
  fetchPizzas,
} from '@RX'
import { FC, ReactElement, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import type { Pizza, PizzaSliceState } from '@RX-pizza'
import type { FilterSliceState } from '@RX-filter'

export const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { pizzas, status } = useSelector(selectPizzas) as PizzaSliceState
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    selectFilter,
  ) as FilterSliceState

  const onChangeCategory = useCallback((id: number): void => {
    dispatch(setCategoryId(id))
  }, [])
  const onChangePage = (page: number): void => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async (): Promise<void> => {
    const sortBy: string = sort.sortProperty.replace('-', '')
    const order: 'asc' | 'desc' = sort.sortProperty.includes('-')
      ? 'asc'
      : 'desc'
    const category: string = categoryId > 0 ? String(categoryId) : ''
    const search: string = searchValue

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    )

    moveScrollToTop()
  }
  const moveScrollToTop = () => window.scrollTo(0, 0)

  useEffect((): void => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzasToShow: ReactElement[] = pizzas.map((pizza: Pizza) => (
    <PizzaBlockComponent key={pizza.id} {...pizza} />
  ))
  const pizzasSkeletons: ReactElement[] = [...new Array(6)].map(
    (_: unknown, pizzaSkeletonIndex: number) => (
      <PizzaSkeletonComponent key={pizzaSkeletonIndex} />
    ),
  )

  return (
    <div className='container'>
      <div className='content__top'>
        <CategoriesComponent
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <SortComponent sort={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? pizzasSkeletons : pizzasToShow}
        </div>
      )}

      <PaginationComponent
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  )
}
