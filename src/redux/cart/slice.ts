import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  calcTotalCartsPrice,
  getCartsFromLocalStorageWithTotalPrice,
} from '@UTS'

import type { Cart, CartSliceState, FilterSlice, ID } from '@RX-cart'

const initialState: CartSliceState = getCartsFromLocalStorageWithTotalPrice()

const cartSlice: FilterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state: CartSliceState, action: PayloadAction<Cart>): void {
      const { payload: newCart } = action
      const foundedStateCart: Cart | undefined = state.carts.find(
        (stateCart: Cart): boolean => stateCart.id === newCart.id,
      )

      if (foundedStateCart) {
        foundedStateCart.quantity += 1
      } else {
        state.carts = [
          ...state.carts,
          {
            ...action.payload,
            quantity: 1,
          },
        ]
      }

      state.totalPrice = calcTotalCartsPrice(state.carts)
    },
    decreaseOneCartQuantity(
      state: CartSliceState,
      action: PayloadAction<ID>,
    ): void {
      const { payload: cartId } = action
      const { carts } = state
      const foundedStateCart: Cart | undefined = carts.find(
        (stateCart: Cart): boolean => stateCart.id === cartId,
      )

      if (foundedStateCart) {
        foundedStateCart.quantity -= 1
      }

      state.totalPrice = calcTotalCartsPrice(carts)
    },
    removeCart(state: CartSliceState, actions: PayloadAction<ID>): void {
      const { payload: cartIdToRemove } = actions
      const { carts } = state
      const newCartsState: Cart[] = carts.filter(
        (stateCart: Cart): boolean => stateCart.id !== cartIdToRemove,
      )

      state.carts = newCartsState
      state.totalPrice = calcTotalCartsPrice(newCartsState)
    },
    clearCarts(state: CartSliceState): void {
      state.carts = []
      state.totalPrice = Number(0)
    },
  },
})

export const { addCart, decreaseOneCartQuantity, removeCart, clearCarts } =
  cartSlice.actions

export default cartSlice.reducer
