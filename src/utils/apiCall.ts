import { Product } from "../common/types"

export const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data: Product[] = await res.json()
    return data
}