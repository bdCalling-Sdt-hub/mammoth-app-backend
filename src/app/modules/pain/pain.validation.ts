import { z } from "zod";

const createDisorderZodSchema = z.object({
    body: z.object({
        disorder_name: z.string({ required_error: "Name is required" }),
        pain_id:z.string({ required_error: "Pain is required" }),
    }),
})

const createUpdateDisorderZodSchema = z.object({
    body: z.object({
        disorder_name: z.string().optional(),
        pain_id: z.string().optional(),
    }),
})

const deleteDisorderZodSchema = z.object({
    body: z.object({
        disorder_id: z.string({ required_error: "Disorder ID is required" }),
        pain_id:z.string({ required_error: "Pain ID is required" }),
    }),
})

export const PainValidation = {
    createDisorderZodSchema,
    createUpdateDisorderZodSchema,
    deleteDisorderZodSchema,
}