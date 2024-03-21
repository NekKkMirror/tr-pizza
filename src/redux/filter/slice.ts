import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortPropertyEnum } from './filter.enum'

import type { FilterSliceState, FilterSlice, Sort } from '@RX-filter'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice: FilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(
      state: FilterSliceState,
      action: PayloadAction<number>,
    ): void {
      const { payload: categoryId } = action

      state.categoryId = categoryId
    },
    setSearchValue(
      state: FilterSliceState,
      action: PayloadAction<string>,
    ): void {
      const { payload: searchValue } = action

      state.searchValue = searchValue
    },
    setSort(state: FilterSliceState, action: PayloadAction<Sort>): void {
      const { payload: sort } = action

      state.sort = sort
    },
    setCurrentPage(
      state: FilterSliceState,
      action: PayloadAction<number>,
    ): void {
      const { payload: currentPage } = action

      state.currentPage = currentPage
    },
    setFilters(
      state: FilterSliceState,
      action: PayloadAction<FilterSliceState>,
    ): void {
      const { payload: filters } = action
      const filtersHasKeys = Object.keys(filters).length

      if (filtersHasKeys) {
        const { currentPage, sort, categoryId, searchValue } = filters

        state.currentPage = currentPage
        state.sort = sort
        state.categoryId = categoryId
        state.searchValue = searchValue

        return
      }

      Object.assign(state, initialState)
    },
  },
})

export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setFilters,
  setCurrentPage,
} = filterSlice.actions

export default filterSlice.reducer
