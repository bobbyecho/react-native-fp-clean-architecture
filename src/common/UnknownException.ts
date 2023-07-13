export class UnknownException extends Error {
  defaultMessage = `UnknownException: ${this.message}`

  constructor(message: string) {
    super(message)
  }
}

export const unknownExceptionFP = (message: string) => () => new UnknownException(message)