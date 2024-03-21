import {
  type PayloadAction,
  type ActionReducerMapBuilder,
  createSlice,
} from '@reduxjs/toolkit'

import { fetchPizzas } from './asyncActions'

import { Status } from './pizza.enum'

import type {
  Pizza,
  PizzaSlice,
  PizzaSliceState,
  SearchPizzaParams,
} from '@RX-pizza'

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
}

const pizzaSlice: PizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state: PizzaSliceState, action: PayloadAction<Pizza[]>): void {
      const { payload: pizzas } = action

      state.pizzas = pizzas
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PizzaSliceState>): void => {
    builder.addCase(fetchPizzas.pending, (state: PizzaSliceState): void => {
      state.status = Status.LOADING
      state.pizzas = []
    })

    builder.addCase(
      fetchPizzas.fulfilled,
      (
        state: PizzaSliceState,
        action: PayloadAction<
          Pizza[],
          string,
          {
            arg: SearchPizzaParams
            requestId: string
            requestStatus: 'fulfilled'
          },
          never
        >,
      ): void => {
        const { payload: pizzas } = action

        state.status = Status.SUCCESS
        state.pizzas = pizzas
      },
    )

    builder.addCase(fetchPizzas.rejected, (state: PizzaSliceState): void => {
      state.status = Status.ERROR
      state.pizzas = []
    })
  },
})

export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
