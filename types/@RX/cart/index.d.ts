import type { PayloadAction, Slice, SliceSelectors } from '@reduxjs/toolkit'

declare module '@RX-cart' {
  type ID = string

  type Cart = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    quantity: number
  }

  type CartSliceState = {
    carts: Cart[]
    totalPrice: number
  }

  type Reducers = {
    addCart(state: CartSliceState, action: PayloadAction<Cart>): void
    decreaseOneCartQuantity(
      state: CartSliceState,
      action: PayloadAction<ID>,
    ): void
    removeCart(state: CartSliceState, actions: PayloadAction<ID>): void
    clearCarts(state: CartSliceState): void
  }

  type FilterSlice = Slice<
    CartSliceState,
    Reducers,
    'cart',
    'cart',
    SliceSelectors<CartSliceState>
  >
}
