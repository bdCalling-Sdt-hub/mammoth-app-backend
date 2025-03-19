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

const createPainZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "title is required" }),
        disorders:z.array(z.object({
            type: z.string({ required_error: "type is required" }),
        })).optional()
    }),
})

const createUpdatePainZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        disorders:z.array(z.object({
            type: z.string().optional(),
        })).optional()
    }),
})
export const PainValidation = {
    createDisorderZodSchema,
    createUpdateDisorderZodSchema,
    deleteDisorderZodSchema,
    createPainZodSchema,
    createUpdatePainZodSchema,
}