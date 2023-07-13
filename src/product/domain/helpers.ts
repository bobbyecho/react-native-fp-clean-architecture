
import { Product } from "./product.interface";
import { UnknownException, unknownExceptionFP } from "../../common/UnknownException";
import { MapperException, mapperExceptionFP } from "../../common/MapperException";
import { either, taskEither } from "fp-ts";

export const convertPriceToIdrArr = either.tryCatchK(
  (products: Product[]) => products.map((product) => ({
    ...product,
    price: String(Number(product.price) * 15000)
  })),
  unknownExceptionFP("Error while converting price to IDR")
)
