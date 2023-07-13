import { Product } from "../../../domain/product.interface";
import { ProductApi } from "./productApi.interface";

export const mapProductApiToDomain = (productsApi: ProductApi[]): Product[] => {
  return productsApi.map(productApi => ({
    id: productApi.id,
    title: productApi.title,
    price: productApi.price,
    image: productApi.image
  }))
}