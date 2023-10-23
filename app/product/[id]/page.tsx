import Image from "next/image"
import { SearchParamTypes } from "@/app/types/SearchParamTypes"
import formatPrice from "@/app/util/PriceFormat"
import AddCart from "./AddCart"

export default function Product({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16">
            <Image
                // src={searchParams.image || '/path/to/default/image.png'} // Added a fallback path
                src={searchParams.image}
                alt={searchParams.name}
                width={600}
                height={600}
                className="object-cover w-full rounded-lg"
                priority={true}
            />

            <div className="font-medium text-base leading-relaxed">
                <h1 className="text-2xl py-2">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
                <div className="flex gap-2">
                    <p className="font-bold text-primary">
                        {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                    </p>
                </div>
                <AddCart {...searchParams} />
            </div>
        </div>
    )
}
