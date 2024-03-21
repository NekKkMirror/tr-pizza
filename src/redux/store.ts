import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filter from './filter/slice'
import pizza from './pizza/slice'
import cart from './cart/slice'

export const store = configureStore({
  reducer: {
    filter,
    pizza,
    cart,
  },
})

type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
