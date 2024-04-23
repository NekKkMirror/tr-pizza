import type { Cart } from '@RX-cart'
import type { RootState } from '../store'

export const selectCarts = (state: RootState) => state.cart

export const selectCartById =
  (cartId: string) =>
  (state: RootState): Cart | undefined => {
    const {
      cart: { carts },
    } = state

    return carts.find((stateCart: Cart): boolean => stateCart.id === cartId)
  }
