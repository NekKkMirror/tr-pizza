import { type Cart } from '@RX-cart'

type GetCartsFromLocalStorageWithTotalPrice = {
  carts: Array<Cart>
  totalPrice: number
}

export const calcTotalCartsPrice = (carts: Cart[]): number => {
  return carts.reduce((cartsTotalSum: number, cart: Cart): number => {
    const currentCartTotalPrice: number = Number(cart.price * cart.quantity)

    return Number(cartsTotalSum + currentCartTotalPrice)
  }, 0)
}

export const getCartsFromLocalStorageWithTotalPrice =
  (): GetCartsFromLocalStorageWithTotalPrice => {
    const localStorageCarts = localStorage.getItem('cart')
    const carts: Array<Cart> | [] = localStorageCarts
      ? JSON.parse(localStorageCarts)
      : []
    const totalPrice: number = calcTotalCartsPrice(carts)

    return {
      carts,
      totalPrice,
    }
  }
