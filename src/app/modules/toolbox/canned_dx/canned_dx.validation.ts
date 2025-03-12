import { z } from "zod";

const createCannedDxZodSchema = z.object({
    body: z.object({
        content: z.string({ required_error: 'content is required' }),
    }),
})

const createUpdateCannedDxZodSchema = z.object({
    body: z.object({
        content: z.string().optional(),
    }),
})

export const CannedDxValidation = {
    createCannedDxZodSchema,
    createUpdateCannedDxZodSchema,
}