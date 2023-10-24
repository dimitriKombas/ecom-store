import Image from "next/image"
import { SearchParamTypes } from "@/app/types/SearchParamTypes"
import formatPrice from "@/app/util/PriceFormat"
import AddCart from "./AddCart"

export default function Product({ searchParams }: SearchParamTypes) {
    return (
        <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16 md:gap-5 mt-24 sm:mt-12">
            <div className="w-full md:w-3/4 lg:w-1/2 2xl:w-full md:max-w-[500px] mx-auto">
                <Image
                    src={searchParams.image}
                    alt={searchParams.name}
                    width={600}
                    height={600}
                    className="object-cover w-full rounded-lg"
                    priority={true}
                />
            </div>

            <div className="font-medium text-base leading-relaxed md:text-sm py-20 sm:py-5 md:py-0 sm:text-xs">
                <h1 className="text-2xl py-2 md:text-xl">{searchParams.name}</h1>
                <p className="py-2">{searchParams.description}</p>
                <p className="py-2">{searchParams.features}</p>
                <div className="flex gap-6">
                    <p className="font-bold text-primary">
                        {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                    </p>
                </div>
                <AddCart {...searchParams} />
            </div>
        </div>

    )
}
