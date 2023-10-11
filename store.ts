import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type CartItem = {
    name: string,
    id: string,
    images?: string[],
    description?: string,
    unit_amount: number,
    quantity: number
}

type CartState = {
    isOpen: boolean
    cart: CartItem[]
    toggleCart: () => void
    addProduct: (item: CartItem) => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })), 
            addProduct: (item) => ((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
                if(existingItem){
                    const updateCart = state.cart.map((cartItem) => {
                        if(cartItem === item.id){
                            return {...cartItem, quantity: cartItem.quantity + 1}
                        }
                        return cartItem
                    })
                    return {cart: updateCart}
                } else {
                    return {cart: [...state.cart, { ...item, quantity:1 }]}
                }
            }),
        }),
        {name: "cart-store"}
    )
)