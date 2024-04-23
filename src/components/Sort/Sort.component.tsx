import { setSort, SortPropertyEnum } from '@RX'
import React, {
  memo,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'

import type { Sort as SortDeclaration } from '@RX-filter'
import type { SortPopupProps } from '@CMP-sort'

export const sortList: SortDeclaration[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
]

export const Sort: React.FC<SortPopupProps> = ({ sort }): ReactElement => {
  const dispatch = useDispatch()
  const sortNameRef: React.RefObject<HTMLSpanElement> =
    useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const useEffectWatchDeps: boolean[] = [open]

  const sortPopupDataValue = 'block[sortPopup]' as const

  const onClickListItem = (sort: SortDeclaration): void => {
    dispatch(setSort(sort))
    setOpen(false)
  }

  useEffect(() => {
    const eventFunctions: Array<[string, EventListenerOrEventListenerObject]> =
      []

    if (open) {
      const clickOutsideEventName = 'click' as const
      const handleClickOutside = (event: Event): void => {
        const { current: sortNameElement } = sortNameRef
        const { target } = event as Event & { target: HTMLElement }
        const isOutsideClick =
          target?.getAttribute('data-block') !== sortPopupDataValue &&
          target !== sortNameElement

        if (isOutsideClick) {
          setOpen(false)
        }
      }

      eventFunctions.push([clickOutsideEventName, handleClickOutside])
      document.addEventListener(clickOutsideEventName, handleClickOutside)
    }

    return () => {
      if (eventFunctions.length) {
        for (const [eventName, eventHandler] of eventFunctions) {
          document.removeEventListener(eventName, eventHandler)
        }
      }
    }
  }, useEffectWatchDeps)

  return (
    <div className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span ref={sortNameRef} onClick={() => setOpen(!open)}>
          {sort?.name}
        </span>
      </div>
      {open && (
        <div className='sort__popup' data-block={sortPopupDataValue}>
          <ul>
            {sortList.map((sortItem: SortDeclaration, index: number) => (
              <li
                key={index}
                onClick={() => onClickListItem(sortItem)}
                className={
                  sort.sortProperty === sortItem.sortProperty ? 'active' : ''
                }
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const SortComponent: React.NamedExoticComponent<SortPopupProps> =
  memo(Sort)
