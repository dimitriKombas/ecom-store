"use client"

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "../util/PriceFormat"
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"
import { Player } from "@lottiefiles/react-lottie-player";
import basket from "@/public/basket.json";

export default function Cart() {
    const cartStore = useCartStore()

    //Total Price
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cartStore.toggleCart()}
            className="fixed w-full h-screen left-0 top-0 bg-black/25 z-50"
        >
            {/* Cart */}
            <motion.div
                layout
                onClick={(e) => e.stopPropagation()}
                className="bg-base-200 absolute right-0 top-0  h-screen p-12 overflow-y-scroll  w-full lg:w-2/5"
            >
                {cartStore.onCheckout === "cart" && (
                    <button
                        onClick={() => cartStore.toggleCart()}
                        className="py-2 px-4 mt-4 text-sm font-bold bg-primary hover:bg-primary-dark transition duration-300 ease-in-out shadow-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        Back to store 🏃
                    </button>
                )}
                {cartStore.onCheckout === "checkout" && (
                    <button
                        onClick={() => cartStore.setCheckout("cart")}
                        className="py-2 px-4 mt-4 mb-4 text-sm font-bold bg-primary hover:bg-primary-dark transition duration-300 ease-in-out shadow-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        Check your cart 🛒
                    </button>
                )}
                {/* Cart Items */}
                {cartStore.onCheckout === "cart" && (
                    <>
                        {cartStore.cart.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                className="flex p-4 gap-4 bg-base-100 my-4 rounded-lg items-center"
                            >
                                <Image
                                    className="rounded-md object-cover"
                                    // src={item.image || '/path/to/default/image.png'}
                                    src={item.image}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                />
                                <div>
                                    <h2>{item.name}</h2>
                                    {/* Update quantity of a product */}
                                    <div className="flex gap-2">
                                        <h2>Quantity: {item.quantity}</h2>
                                        <button
                                            onClick={() =>
                                                cartStore.removeProduct({
                                                    id: item.id,
                                                    image: item.image,
                                                    name: item.name,
                                                    unit_amount: item.unit_amount,
                                                    quantity: item.quantity,
                                                })
                                            }
                                        >
                                            <IoRemoveCircle />
                                        </button>
                                        <button
                                            onClick={() =>
                                                cartStore.addProduct({
                                                    id: item.id,
                                                    image: item.image,
                                                    name: item.name,
                                                    unit_amount: item.unit_amount,
                                                    quantity: item.quantity,
                                                })
                                            }
                                        >
                                            <IoAddCircle />
                                        </button>
                                    </div>
                                    <p className="text-sm">
                                        {item.unit_amount && formatPrice(item.unit_amount)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </>
                )}
                {/* Checkout and total */}
                {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
                    <motion.div layout>
                        <p>Total: {formatPrice(totalPrice)}</p>
                        <button
                            onClick={() => cartStore.setCheckout("checkout")}
                            className="py-2 mt-4 bg-primary w-full rounded-md text-white"
                        >
                            Checkout
                        </button>
                    </motion.div>
                ) : null}
                {/* Checkout Form */}
                {cartStore.onCheckout === "checkout" && <Checkout />}
                {cartStore.onCheckout === "success" && <OrderConfirmed />}
                <AnimatePresence>
                    {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
                        <motion.div
                            animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
                            initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                            exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                            className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
                        >
                            <h1>Your cart is empty 😢</h1>
                            <Player
                                autoplay
                                loop
                                src={basket}
                                style={{ width: "350px", height: "350px" }}
                            ></Player>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
