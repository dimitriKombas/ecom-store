import Image from "next/image"
import formatPrice from "../util/PriceFormat"
import { ProductType } from "../types/AddCartType"
import { metadata } from "../layout"

export default function Product({ name, image, price }: ProductType) {
    return (
        <div>
            <Image src={image} alt={name} width={800} height={800} className="w-full h-96 object-cover" />
            <h1>{name}</h1>
            {price && formatPrice(price)}
        </div>
    )
}
