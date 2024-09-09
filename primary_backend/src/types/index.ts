import {z} from "zod"

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const SigninSchema = z.object({
    userName : z.string(),
    password : z.string()
})