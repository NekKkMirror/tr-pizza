import { setSearchValue } from '@RX'
import {
  type ChangeEvent,
  type FC,
  type MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

import { useDispatch } from 'react-redux'

export const SearchComponent: FC = () => {
  const dispatch = useDispatch()
  const [localStateSearchValue, setLocalStateSearchValue] = useState<string>('')
  const inputRef: MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null)

  const onClickClearInput = (): void => {
    dispatch(setSearchValue(''))
    setLocalStateSearchValue('')
    inputRef.current?.focus()
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event

    setLocalStateSearchValue(value)
    updateSearchValue(value)
  }

  const updateSearchValue = useCallback(
    debounce((searchString: string) => {
      dispatch(setSearchValue(searchString), 150)
    }),
    [],
  )

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground='new 0 0 32 32'
        id='EditableLine'
        version='1.1'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='14'
          cy='14'
          fill='none'
          id='XMLID_42_'
          r='9'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
        />
        <line
          fill='none'
          id='XMLID_44_'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='27'
          x2='20.366'
          y1='27'
          y2='20.366'
        />
      </svg>
      <input
        ref={inputRef}
        value={localStateSearchValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {localStateSearchValue && (
        <svg
          onClick={onClickClearInput}
          className={styles.clearIcon}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
        </svg>
      )}
    </div>
  )
}
