import { generate } from "random-words"

export const words = generate({exactly: 500, minLength: 6, maxLength: 8});