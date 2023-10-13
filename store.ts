import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { AddCartType } from './app/types/AddCartType'

// Type definition for the entire cart state.
type CartState = {
    isOpen: boolean
    cart: AddCartType[]
    toggleCart: () => void
    // clearCart: () => void
    addProduct: (item: AddCartType) => void
    removeProduct: (item: AddCartType) => void
    paymentIntent: string
    onCheckout: string
    setPaymentIntent: (val:string) => void
    setCheckout: (val:string) => void
}

// Creating the cart store using zustand and making it persistent.
export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            // Initial empty cart.
            cart: [],
            // Cart is initially closed.
            isOpen: false,
            paymentIntent: "",
            onCheckout: "cart",
            // Function to toggle the cart's open/close state.
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })), 
            // Function to add a product to the cart.
            addProduct: (item) => set((state) => {
                // Check if the item already exists in the cart.
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
                // If the item exists, update its quantity.
                if(existingItem){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id === item.id){
                            return {...cartItem, quantity: cartItem.quantity as number + 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart}
                } else {
                    // If the item doesn't exist, add it to the cart with a quantity of 1.
                    return {cart: [...state.cart, { ...item, quantity: 1 }]}
                }
            }),
            removeProduct: (item) => {
                set((state) => {
                    const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
                    // Check if the item exists and remove quantity
                    if(existingItem && existingItem.quantity! > 1){
                        const updatedCart = state.cart.map((cartItem) => {
                            if(cartItem.id === item.id){
                                return {...cartItem, quantity: cartItem.quantity! -1}
                            }
                            return cartItem
                        })
                        return {cart: updatedCart}
                    } else {
                        // Remove item from cart
                        const filteredCard = state.cart.filter((cartItem) => cartItem.id !== item.id)
                        return {cart: filteredCard}
                    }
                })
            },
            setPaymentIntent: (val) => set((state) => ({paymentIntent: val})),
            setCheckout: (val) => set((state) => ({onCheckout: val})),
        }),
        // Name for the persisted store in local storage or elsewhere.
        {name: "cart-store"}
    )
)