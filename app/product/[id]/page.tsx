import Image from "next/image"
import { SearchParamTypes } from "@/app/types/SearchParamTypes"
import formatPrice from "@/app/util/PriceFormat"
import AddCart from "./AddCart"

export default async function Product({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={500}
                height={800}
                className="w-full rounded-lg"
            />
            <div className="font-medium text-gray-700">
                <h1 className="Name text-2xl py-2">{searchParams.name}</h1>
                <p className="Description py-2">{searchParams.description}</p>
                <p className="Metadata py-2">{searchParams.features}</p>
                <div className="flex gap-2">
                    <p className="font-bold text-teal-700">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)} </p>
                </div>
                <AddCart {...searchParams} />
            </div>
        </div>
    )
} 