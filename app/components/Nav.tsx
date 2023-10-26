'use client'

import { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion"
import DarkLight from "./DarkLight"
import applelogo from "@/public/applelogo.png";

// Define the Nav component.
export default function Nav({ user }: Session) {
    const cartStore = useCartStore()
    // Calculate the total quantity of all items in the cart.
    const totalQuantity = cartStore.cart.reduce((acc, item) => acc + item.quantity!, 0);
    return (
        <nav
            className="flex justify-between items-center py-8 mt-1">
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                transition={{ delay: 0.8 }}
            >
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0%' }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 items-center py-25" // Adjusted classes
                    >
                        <Image
                            src={applelogo}
                            alt="Logo Image"
                            width={50}
                            height={50}
                            className="mr-0"
                        />
                        <h1 className="font-lobster text-2xl ml-0">iMarketHub</h1>
                    </motion.div>
                </Link>
            </motion.div>
            <ul className="flex items-center gap-4 sm:gap-4 lg:gap-8">
                {/* Toggle the cart */}
                <li
                    onClick={() => cartStore.toggleCart()}
                    className="flex items-center text-3xl relative cursor-pointer">
                    <AiFillShopping />
                    <AnimatePresence>
                        {totalQuantity > 0 && (
                            <motion.span
                                animate={{ scale: 1 }}
                                initial={{ scale: 0 }}
                                exit={{ scale: 0 }}
                                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
                                {totalQuantity}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
                {/* {Dark mode} */}
                <DarkLight />
                {/* If the user is not signed in */}
                {!user && (
                    <li
                        className="bg-primary text-white py-2 px-4 rounded-md">
                        <button
                            onClick={() => signIn()}>Sign in
                        </button>
                    </li>
                )}
                {user && (
                    <li>
                        <div className="dropdown dropdown-end cursor-pointer">
                            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                                <Image
                                    src={user?.image as string}
                                    alt={user.name as string}
                                    layout="fill"
                                    className="rounded-full object-cover"
                                    tabIndex={0}
                                />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-4 space-y-4 shadow bg-opacity-70 bg-base-100 rounded-box w-72 z-50">
                                <Link
                                    className="bg-opacity-70 hover:bg-opacity-100 bg-base-100 p-5 rounded-md"
                                    href={'/dashboard'}
                                    onClick={() => {
                                        if (document.activeElement instanceof HTMLElement) {
                                            document.activeElement.blur()
                                        }
                                    }}
                                >
                                    Orders
                                </Link>
                                <li
                                    onClick={() => {
                                        signOut()
                                        if (document.activeElement instanceof HTMLElement) {
                                            document.activeElement.blur()
                                        }
                                    }}
                                    className="bg-opacity-70 hover:bg-opacity-100 bg-base-100 p-5 rounded-md"
                                >
                                    Sign out
                                </li>
                            </ul>

                        </div>
                    </li>
                )}
            </ul>
            {/* If the cart state is open, display the Cart component. */}
            <AnimatePresence>
                {cartStore.isOpen && <Cart />}
            </AnimatePresence>
        </nav >
    )
}