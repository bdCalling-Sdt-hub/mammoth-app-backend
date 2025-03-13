import { z } from "zod";

const createMedicalTermsZodSchema = z.object({
    body: z.object({
        content: z.string({ required_error: 'content is required' }),
        type: z.enum(["medical_diagnosis","pain_description"])
    }),
})

const createUpdateMedicalTermsZodSchema = z.object({
    body: z.object({
        content: z.string().optional(),
        type: z.enum(["medical_diagnosis","pain_description"]).optional(),
    }),
 })

export const MedicalTermsValidation = {
    createMedicalTermsZodSchema,
    createUpdateMedicalTermsZodSchema,
}