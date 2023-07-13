import { AxiosResponse } from "axios"
import { apiClient } from "../../../../common/apiClient"
import { ProductApi } from "./productApi.interface"

export function productApi() {
  function getProducts () {
    return apiClient.get<ProductApi[]>('/products')
  }

  return {
    getProducts
  }
}