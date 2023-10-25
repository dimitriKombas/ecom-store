"use client"

import Image from "next/image";
import formatPrice from "../util/PriceFormat";
import { ProductType } from "../types/ProductType";
import Link from "next/link";
import { useThemeStore } from "@/store";  // Update path accordingly.

export default function Product({ name, image, unit_amount, id, description, metadata }: ProductType) {
    const { features } = metadata;
    const mode = useThemeStore((state) => state.mode);
    const shadowColor = mode === "dark" ? "shadow-lg shadow-blue-200" : "shadow-lg hover:shadow-2xl";

    return (
        <div className={`mb-20 flex flex-col items-center bg-neutral-10 rounded-xl transition-shadow cursor-pointer ${shadowColor}`}>
            <Link href={{ pathname: `/product/${id}`, query: { name, image, unit_amount, id, description, features } }}>
                <div className="w-64 h-64 relative overflow-hidden rounded-xl p-4 cursor-pointer">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        objectFit="contain"
                        className="w-full h-full "
                    />
                </div>
            </Link>
            <div className="font-medium py-2 text-center w-full">
                <h1 className="truncate">{name}</h1>
                <h2 className="text-sm text-primary">
                    {unit_amount && formatPrice(unit_amount)}
                </h2>
            </div>
        </div>
    );
}