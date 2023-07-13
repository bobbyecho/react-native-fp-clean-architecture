import { shallow } from "zustand/shallow"
import { cartStore } from "./store/cartStore"

export const useCart = () => {

  const { addTocart, isItemExists, deleteFromCart } = cartStore(
    (state) => ({
      addTocart: state.addToCart,
      isItemExists: state.isItemExists,
      deleteFromCart: state.deleteFromCart,
    }),
    shallow
  )

  return {
    addTocart,
    isItemExists,
    deleteFromCart
  }
}

export const useCartGet = () => {

  const { totalItems, totalPrice } = cartStore(
    (state) => ({
      totalItems: state.getTotalItem(),
      totalPrice: state.getTotalPrice(),
    }),
    shallow
  )

  return {
    totalItems,
    totalPrice,    
  }
}