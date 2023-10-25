import Link from 'next/link';
import Image from 'next/image';
import { SearchParamTypes } from "@/app/types/SearchParamTypes";
import formatPrice from "@/app/util/PriceFormat";
import AddCart from "./AddCart";

export default function Product({ searchParams }: SearchParamTypes) {
    return (
        <div>
            {/* <div className="mb-0">
                <Link href="/">
                    <button className="py-1 px-2 mt-2 text-sm font-bold bg-primary transition-transform transform duration-300 hover:scale-105 hover:shadow-lg ease-in-out shadow-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        X
                    </button>

                </Link>
            </div> */}

            <div className="relative flex flex-col 2xl:flex-row items-center justify-between gap-0 lg:gap-16 md:gap-0 mt-14 sm:mt-12">
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

                <div className="font-medium text-base leading-relaxed md:text-sm py-20 sm:py-5 md:py-0 sm:text-xs mb-14">
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
        </div>
    );
}
