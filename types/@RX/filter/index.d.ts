import type { PayloadAction, Slice, SliceSelectors } from '@reduxjs/toolkit'

declare module '@RX-filter' {
  enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
  }

  type Sort = {
    name: string
    sortProperty: SortPropertyEnum
  }

  type FilterSliceState = {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: Sort
  }

  type Reducers = {
    setCategoryId(state: FilterSliceState, action: PayloadAction<number>): void
    setSearchValue(state: FilterSliceState, action: PayloadAction<string>): void
    setSort(state: FilterSliceState, action: PayloadAction<Sort>): void
    setCurrentPage(state: FilterSliceState, action: PayloadAction<number>): void
    setFilters(
      state: FilterSliceState,
      action: PayloadAction<FilterSliceState>,
    ): void
  }

  type FilterSlice = Slice<
    FilterSliceState,
    Reducers,
    'filters',
    'filters',
    SliceSelectors<FilterSliceState>
  >
}
