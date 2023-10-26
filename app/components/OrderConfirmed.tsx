"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store"
import { useEffect } from "react"
import { Player } from "@lottiefiles/react-lottie-player";
import success from "@/public/success.json";

export default function OrderConfirmed() {
    const cartStore = useCartStore()

    useEffect(() => {
        cartStore.setPaymentIntent("")
        cartStore.clearCart()
    }, [])

    const checkoutOrder = () => {
        setTimeout(() => {
            cartStore.setCheckout("cart")
        }, 1000)
        cartStore.toggleCart()
    }

    return (
        <motion.div
            className="flex items-center justify-center my-12"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <div className="p-12 rounded-md text-center ">
                <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
                <h2 className="text-sm my-4 ">Check your email for the receipt.</h2>
                <Player
                    autoplay
                    loop
                    src={success}
                    style={{ width: "350px", height: "350px" }}
                ></Player>

                <div className="flex items-center justify-center gap-12">
                    <Link href={"/dashboard"}>
                        <button
                            onClick={checkoutOrder}
                            className="py-2 px-4 mt-4 text-sm font-bold bg-primary transition-transform transform duration-300 hover:scale-105 hover:shadow-lg ease-in-out shadow-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        >
                            Check your Order
                        </button>
                    </Link>

                </div>
            </div>
        </motion.div>
    )
}