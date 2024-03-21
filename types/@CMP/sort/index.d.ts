import type { Sort } from '@RX-filter'
import type { ReactNode } from 'react'

declare module '@CMP-sort' {
  type PopupClick = MouseEvent & {
    path: ReactNode[]
  }

  type SortPopupProps = {
    sort: Sort
  }
}
