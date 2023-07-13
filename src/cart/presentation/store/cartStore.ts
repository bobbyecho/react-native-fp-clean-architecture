import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Cart } from '../../domain/Cart'

type CartState = {
  items: Record<string, Cart>
}

type CartAction = {
  addToCart: (item: Cart) => void
  deleteFromCart: (id: number) => void
  getTotalPrice: () => number
  getCart: (id: number) => Cart
  isItemExists: (id: number) => boolean
  getTotalItem: () => number
}

const initialState: CartState = {
  items: {}
}

export const cartStore = create<CartState & CartAction, [["zustand/immer", never]]>(
  immer((set, get) => ({
    ...initialState,
    getCart: (id: number) => {
      const { items } = get()
      return items[id]
    },
    deleteFromCart: (id: number) => {
      set((state) => {
        delete state.items[id]
      })
    },
    getTotalItem: () => {
      const {items} = get()
      return Object.keys(items).length
    },
    getTotalPrice: () => {
      const { items } = get()
      return Object.keys(items)
        .map(key => items[key])
        .reduce((acc, item) => acc + (item.amount * Number(item.price)), 0)
    },
    addToCart: (item: Cart) => {
      set((state) => {
        const { items } = state
        if (items[item.id]) {
          items[item.id].amount += 1
        } else {
          items[item.id] = item
        }
      })
    },
    isItemExists: (id: number) => {
      const { items } = get()
      return !!items[id]
    },
    resetCart: () => {
      set((state) => state.items = {})
    }
  }))
)