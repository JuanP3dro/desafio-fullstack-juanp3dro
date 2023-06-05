import {z} from "zod"

export const contactSchema = z.object({
    id: z.string(),
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email().nonempty('Email é obrigatório'),
    telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 caracteres').transform((data) => Number(data)),
    createdAt: z.string(),
    clientId: z.string()
})

export const createContactSchema=contactSchema.omit({
    clientId:true,
    id:true,
    createdAt:true,
}) 

export const clientSchema = contactSchema.omit({
    clientId:true
})

export type createContactData = z.infer<typeof createContactSchema>
export type contactData = z.infer<typeof contactSchema>
export type clientData = z.infer<typeof clientSchema>