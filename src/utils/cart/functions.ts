import { type CartItem } from '@RX/cart/types'

type GetCartsFromLocalStorageWithTotalPrice = {
  carts: Array<CartItem>
  totalPrice: number
}

export const calcTotalCartsPrice = (carts: CartItem[]): number => {
  return carts.reduce((cartsTotalSum: number, cart: CartItem): number => {
    const currentCartTotalPrice: number = Number(cart.price * cart.count)
    const cartsTotalPrice: number = Number(
      cartsTotalSum + currentCartTotalPrice,
    )

    return cartsTotalPrice
  }, 0)
}

export const getCartsFromLocalStorageWithTotalPrice =
  (): GetCartsFromLocalStorageWithTotalPrice => {
    const localStorageCarts = localStorage.getItem('cart')
    const carts: Array<CartItem> | [] = localStorageCarts
      ? JSON.parse(localStorageCarts)
      : []
    const totalPrice: number = calcTotalCartsPrice(carts)

    return {
      carts,
      totalPrice,
    }
  }
