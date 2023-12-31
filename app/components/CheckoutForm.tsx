"use client"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from "../util/PriceFormat"
import { useCartStore } from "@/store"
import { motion } from "framer-motion"

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {

    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const cartStore = useCartStore()
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)
    const formattedPrice = formatPrice(totalPrice)
    const [isFormComplete, setIsFormComplete] = useState(false);


    useEffect(() => {
        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return
        }
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })
            .then((result) => {
                if (!result.error) {
                    cartStore.setCheckout("success")
                }
                setIsLoading(false)
            })
    }

    return (
        <>
            <h1 className="text-xs sm:text-lg font-bold py-2 text-center text-purple-950 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out animate-pulse mb-4">
                🧪 Testing tip! Fill 4242 4242 4242 4242
            </h1>
            <form onSubmit={handleSubmit} id="payment-form">
                <PaymentElement
                    id="payment-element"
                    options={{ layout: "tabs" }}
                    onChange={(event) => {
                        setIsFormComplete(event.complete)
                    }} />
                <h1 className="py-4 text-sm font-bold">Total: {formattedPrice}</h1>
                <motion.button
                    whileHover={isLoading || !stripe || !elements || !isFormComplete ? {} : { scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={isLoading || !stripe || !elements || !isFormComplete ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
                    className={`py-2 mt-4 w-full bg-primary rounded-md text-white disabled:opacity-25`}
                    id="submit"
                    disabled={isLoading || !stripe || !elements || !isFormComplete}>
                    <span id="button-text">
                        {isLoading ? <span>Processing ...</span> : <span>Pay now 🔥</span>}
                    </span>
                </motion.button>
            </form>
        </>
    );
}