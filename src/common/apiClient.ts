import axios from "axios"

const API_URL = "https://fakestoreapi.com"

const apiClient = axios.create({
  baseURL: API_URL
})

export { apiClient }