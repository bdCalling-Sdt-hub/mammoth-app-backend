import { z } from "zod";

const createSaveInsuranceZodSchema = z.object({
    body: z.object({
        name:z.string({required_error:"name is required"})
    })
})

const createUpdateInsuranceZodSchema = z.object({
    body: z.object({
        name:z.string().optional()
    })
})

export const InsuranceValidation = {
    createSaveInsuranceZodSchema,
    createUpdateInsuranceZodSchema
}