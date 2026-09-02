'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'

export type CartItem = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  variant?: string
  quantity: number
}

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'add'; item: Omit<CartItem, 'quantity'>; quantity: number }
  | { type: 'remove'; id: string; variant?: string }
  | { type: 'setQuantity'; id: string; variant?: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] }

const STORAGE_KEY = 'dilya-cart'

function sameLine(a: CartItem, id: string, variant?: string) {
  return a.id === id && (a.variant ?? '') === (variant ?? '')
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return { items: action.items }
    case 'add': {
      const existing = state.items.find((i) =>
        sameLine(i, action.item.id, action.item.variant),
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            sameLine(i, action.item.id, action.item.variant)
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, quantity: action.quantity }] }
    }
    case 'setQuantity':
      return {
        items: state.items
          .map((i) =>
            sameLine(i, action.id, action.variant)
              ? { ...i, quantity: Math.max(1, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      }
    case 'remove':
      return {
        items: state.items.filter((i) => !sameLine(i, action.id, action.variant)),
      }
    case 'clear':
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string, variant?: string) => void
  setQuantity: (id: string, quantity: number, variant?: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [isOpen, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) })
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items, hydrated])

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0)
    const subtotal = state.items.reduce((n, i) => n + i.price * i.quantity, 0)
    return {
      items: state.items,
      count,
      subtotal,
      isOpen,
      setOpen,
      addItem: (item, quantity = 1) => {
        dispatch({ type: 'add', item, quantity })
        setOpen(true)
      },
      removeItem: (id, variant) => dispatch({ type: 'remove', id, variant }),
      setQuantity: (id, quantity, variant) =>
        dispatch({ type: 'setQuantity', id, quantity, variant }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [state.items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
