'use client'

import { useCartStore } from "@/store"
import { AddCartType } from "@/app/types/AddCartType"
import { useState } from "react"

export default function AddCart({ name, id, image, unit_amount, quantity }) {
    const cartStore = useCartStore()
    return (
        <>
            <button onClick={() => } className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">Add to cart</button>
        </>
    )
}