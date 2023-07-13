import { either, taskEither } from "fp-ts";
import { Product } from "../domain/product.interface";
import { IProductRepository } from "../domain/productRepository";
import { productApi } from "./datasources/api/productApi";
import { mapProductApiToDomain, } from "./datasources/api/productApi.mapper";
import { ApiException, apiExceptionFP } from "../../common/ApiException";
import { MapperException, mapperExceptionFP } from "../../common/MapperException";
import { ProductApi } from "./datasources/api/productApi.interface"
import { TaskEither } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

export function productRepositoryImpl(): IProductRepository {
  const api = productApi()

  function getAllProducts(): TaskEither<ApiException | MapperException, Product[]> {
    const fetchProducts = taskEither.tryCatch(
      api.getProducts,
      apiExceptionFP("Error fetching products"),
    )
   
    const mapResponseToProducts = either.tryCatchK(
      (response: ProductApi[]) => mapProductApiToDomain(response),
      mapperExceptionFP("Error mapping response to products")
    )

    const fetchAndMap = pipe(
      fetchProducts,
      taskEither.chain(response => 
        taskEither.fromEither(mapResponseToProducts(response.data))
      )
    )

    return fetchAndMap
  }

  return {
    getAllProducts
  }
}