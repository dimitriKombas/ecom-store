'use client'

import { useCartStore } from "@/store"
import { AddCartType } from "@/app/types/AddCartType"
import { useState } from "react"

// Define the AddCart component.
export default function AddCart({
    name,
    id,
    image,
    unit_amount,
    quantity
}: AddCartType) {
    // Using the cart store for this component.
    const cartStore = useCartStore()
    // State to track if a product was recently added to the cart.
    const [added, setAdded] = useState(false)

    // Function to handle adding a product to the cart.
    const handleAddToCart = () => {
        // Add product to the cart store.
        cartStore.addProduct({ id, name, image, unit_amount, quantity })
        // Indicate that the product was added.
        setAdded(true)
        // Reset the added state after a brief duration (500ms in this case).
        setTimeout(() => {
            setAdded(false)
        }, 500)
    }

    return (
        <>
            {/* Button to add the product to the cart. */}
            <button
                onClick={handleAddToCart}
                disabled={added}
                className="w-full py-2 px-4 mt-4 text-sm font-bold bg-primary transition-transform transform duration-300 hover:scale-105 hover:shadow-lg ease-in-out shadow-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                {!added && <span>Add to cart</span>}
                {added && <span>Adding to cart 🤩</span>}
            </button>
        </>
    )
}