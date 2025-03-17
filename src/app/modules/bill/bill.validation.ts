import { z } from "zod";

const createBillZodSchema = z.object({
    body: z.object({
        report:z.string({required_error:"report id required"}),
        total_amount:z.number({required_error:"total amount required"}),
        bill_date:z.string({required_error:"bill date required"}),
    })
})

const updateBillStatusZodSchema = z.object({
    body: z.object({
        status: z.boolean({required_error:"status required"}),
    })
})

export const BillValidation = {
    createBillZodSchema,
    updateBillStatusZodSchema,
}