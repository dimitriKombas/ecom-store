"use client"

import formatPrice from "../util/PriceFormat"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import loading from "@/public/loading.json";
import loadingOrdersAnimation from "../components/loadingOrdersAnimation" // Import the new component
import { Player } from "@lottiefiles/react-lottie-player";


export default function Dashboard() {
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        const res = await fetch("/api/auth/get-orders");
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        fetchOrders()
            .then((data) => {
                setOrders(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center mt-6">
                <Player autoplay loop src={loading} style={{ width: "60%", height: "60%" }}></Player>
            </div>
        );
    }
    if (error) return <p>Error: {error}</p>;

    return (
        <motion.div layout>
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {orders ? orders.map((order) => (
                    <div key={order.id} className="rounded-lg p-8 my-4 space-y-2 bg-base-200">
                        {/* Lottie Animation should be displayed here if the order hasn't loaded yet */}
                        {isLoading ? (
                            <div className="flex items-center justify-center mt-6">
                                <Player autoplay loop src={loading} style={{ width: "100%", height: "auto" }}></Player>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
                                <p className="text-xs">
                                    Status:
                                    <span className={`${order.status === "complete" ? "bg-teal-500" : "bg-orange-500"} text-white py-1 rounded-md px-2 mx-2 text-xs`}>
                                        {order.status}
                                    </span>
                                </p>
                                <p className="text-xs">Time: {new Date(order.createdDate).toString()}</p>
                                <div className="text-sm lg:flex items-center  gap-4">
                                    {order.products.map((product) => (
                                        <div className="py-2" key={product.id}>
                                            <h2 className="py-2">{product.name}</h2>
                                            <div className="flex items-baseline gap-4">
                                                <Image src={product.image!} width={36} height={36} alt={product.name} priority={true} className="w-auto" />
                                                <p>{formatPrice(product.unit_amount)}</p>
                                                <p>Quantity: {product.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="font-medium py-2">Total: {formatPrice(order.amount)}</p>
                            </>
                        )}
                    </div>
                )) : null}
            </motion.div>
        </motion.div>
    );
}

