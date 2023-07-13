import { useQuery } from "@tanstack/react-query"
import { productRepositoryImpl } from "../data/productRepositoryImpl"
import { either, taskEither } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { MapperException } from "../../common/MapperException"
import { Alert } from "react-native"
import { ApiException } from "../../common/ApiException"
import { convertPriceToIdrUseCase } from "../domain/usecases/convertPriceToIdrUseCase"
import { Product } from "../domain/product.interface"
import { UnknownException } from "../../common/UnknownException"

export function useProduct() {

  const productRepository = productRepositoryImpl()

  const { data, isLoading } = useQuery({
    initialData: [] as any,
    queryKey: ['repoProducts'],
    queryFn: async () => {
      const getResult = await pipe(
        productRepository.getAllProducts(),
        taskEither.chainW(convertPriceToIdrUseCase)
      )()

      return either.getOrElse<ApiException | MapperException | UnknownException, Product[]>((e) => {
        if (e instanceof ApiException) {
          Alert.alert("Api Exception", e.message)
        }
        if (e instanceof MapperException) {
          Alert.alert("Mapper Exception", e.message)
        }
        if (e instanceof UnknownException) {
          Alert.alert("Unknown Exception", e.message)
        }

        return []
      })(getResult)
    }
  })

  return {
    data,
    isLoading
  }
}