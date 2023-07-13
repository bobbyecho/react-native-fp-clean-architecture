import { either } from "fp-ts";


export const isNil = (value: any) => value === undefined || value === null || value === ""
export const validateNil = (mesasge: string) => (value: any) => {
  return isNil(value) ? either.left(mesasge) : either.right(value)
}

export const isNumber = (value: any) => !isNaN(value)
export const validateIsNotNumber = (message: string) => (value: any) => {
  return !isNumber(value) ? either.left(message) : either.right(value)
}