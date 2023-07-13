export class MapperException extends Error {
  
  constructor(message: string) {
    super(message)
  }
}

export const mapperExceptionFP = (message: string) => () => new MapperException(message)
