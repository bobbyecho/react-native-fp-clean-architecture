import { TaskEither } from "fp-ts/lib/TaskEither";
import { Product } from "./product.interface";
import { ApiException } from "../../common/ApiException";
import { MapperException } from "../../common/MapperException";

export interface IProductRepository {
  getAllProducts(): TaskEither<ApiException | MapperException, Product[]>
}