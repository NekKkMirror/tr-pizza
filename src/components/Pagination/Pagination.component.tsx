import type { PaginationProps } from '@CMP-pagination'
import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

export const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => (
  <ReactPaginate
    breakLabel='...'
    className={styles.root}
    forcePage={currentPage - 1}
    nextLabel='>'
    pageCount={3}
    pageRangeDisplayed={4}
    previousLabel='<'
    onPageChange={(event) => onChangePage(event.selected + 1)}
  />
)
