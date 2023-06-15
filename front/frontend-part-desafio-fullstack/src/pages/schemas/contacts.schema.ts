import {z} from "zod"

export const contactSchema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email().nonempty('Email é obrigatório'),
    telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 caracteres'),
    createdAt: z.string().optional(),
    clientId: z.string().optional()
})

export const createContactSchema=contactSchema.omit({
    clientId:true,
    id:true,
    createdAt:true
}) 
export const editContactSchema=createContactSchema.merge(
    z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      telefone: z
        .string()
        .min(9, "O telefone deve ter pelo menos 9 caracteres")
        .transform((data) => Number(data))
        .optional(),
    }))

export const clientSchema = contactSchema.omit({
    clientId:true,
    createdAt: true
})

export const editClientSchema=z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    telefone: z.string().min(9, 'O telefone deve ter pelo menos 9 caracteres').optional()
})

export type CreateContactData = z.infer<typeof createContactSchema>
export type EditContactData = z.infer<typeof editContactSchema>
export type EditClientData = z.infer<typeof editClientSchema>
export type ContactData = z.infer<typeof contactSchema>
export type ClientData = z.infer<typeof clientSchema>