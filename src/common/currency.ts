import { flow, pipe } from "fp-ts/lib/function";
import { validateIsNotNumber, validateNil } from "./validator";
import { either } from "fp-ts";

export const rupiahFormatterE = flow(
  validateNil("currency can't be nil!"),
  either.chain(validateIsNotNumber("currency should be a number!")),
  either.chain((a) => {
    return either.right("Rp " + Number(a).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."))
  }),
  either.mapLeft((message) => message)
);

export const rupiahFormatter = (value: any, errorValue: any = "") => pipe(
  value,
  rupiahFormatterE,
  either.getOrElse(() => errorValue)
)