import { AxiosError } from "axios";

export class ApiException extends AxiosError {

  constructor(message: string) {
    super(message)
  }
}

export const apiExceptionFP = (message: string) => () => new ApiException(message)