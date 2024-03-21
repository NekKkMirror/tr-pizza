import { RootState } from '@RX'

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort
