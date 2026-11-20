import { generate } from "random-words"

export const words = generate({exactly: 500, minLength: 5, maxLength: 8});