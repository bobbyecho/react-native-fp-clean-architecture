import { TaskEither } from "fp-ts/lib/TaskEither";
import { ApiException } from "../../../common/ApiException";
import { MapperException } from "../../../common/MapperException";
import { Product } from "../product.interface";
import { convertPriceToIdrArr } from "../helpers";
import { taskEither } from "fp-ts";
import { UnknownException } from "../../../common/UnknownException";

export function convertPriceToIdrUseCase(products: Product[]): TaskEither<ApiException | MapperException | UnknownException, Product[]> {
  return taskEither.fromEither(convertPriceToIdrArr(products))
}