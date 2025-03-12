import { z } from "zod";
const sideEnum = z.enum(["report_disclaimer", "length_response","non_length_response"])
const createDisclaimerZodSchema = z.object({
    body: z.object({
        content: z.string({ required_error: "Content is required" }),
        type:sideEnum
    }),
})

export const DisclaimerValidation = {
    createDisclaimerZodSchema
}