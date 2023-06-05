import {z} from "zod"

export const userSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email().nonempty('Email é obrigatório'),
    telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 caracteres').transform((data) => Number(data)),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").nonempty('Senha é obrigatória')
})

export const loginSchema = userSchema.omit({
    name:true,
    telefone:true
})

export type UserData = z.infer<typeof userSchema>
export type LoginData = z.infer<typeof loginSchema>