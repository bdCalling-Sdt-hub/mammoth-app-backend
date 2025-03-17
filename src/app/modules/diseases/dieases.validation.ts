import { z } from "zod";

const createAddDieasesZodSchema = z.object({
    body: z.object({
        name:z.string({required_error:"name is required"}),
        disorders:z.array(z.object({name:z.string({required_error:"name is required"})})).optional()
    }),
})

const createUpdateDisorderZodSchema = z.object({
    body: z.object({
        name:z.string().optional(),
        disorders:z.array(z.object({name:z.string().optional()})).optional()
    }),
})

const createAddDisorderZodSchema = z.object({
    body: z.object({
        name:z.string({required_error:"name is required"}),
    }),
})
export const DieasesValidation = {
    createAddDieasesZodSchema,
    createUpdateDisorderZodSchema,
    createAddDisorderZodSchema
}