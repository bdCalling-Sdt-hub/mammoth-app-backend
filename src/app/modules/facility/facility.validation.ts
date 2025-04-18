import { z } from "zod";

const createFaciliyValidationZodSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        contactName: z.string().min(1, "Contact Name is required"),
        email: z.string().email("Invalid email format"),
        phone: z.string().min(1, "Phone is required"),
        address: z.string().min(1, "Address is required"),
        suite: z.string().optional(),
        notificationEmail1: z.string().email("Invalid email format"),
        notificationEmail2: z.string().email("Invalid email format").optional(),
        fax: z.string().optional(),
        accountType: z.string().min(1, "Account Type is required"),
        doctors: z.array(z.string()).optional(), // Assuming ObjectId stored as a string
        representative: z.string().optional(),
        disorders: z.array(
          z.object({
            name: z.string().min(1, "Name is required"),
            isHidden: z.boolean().default(false),
            disorders: z.array(
              z.object({
                name: z.string().min(1, "Name is required"),
                isHidden: z.boolean().default(false),
              })
            ),
          })
        ).optional(),
      
        reasons: z.array(
          z.object({
            name: z.string().min(1, "Name is required"),
            isHidden: z.boolean().default(false),
          })
        ).optional(),
      
        clinical_symptoms: z.array(
          z.object({
            title: z.string().min(1, "Name is required"),
            isHidden: z.boolean().default(false),
            disorders: z.array(
              z.object({
                name: z.string().min(1, "Name is required"),
                isHidden: z.boolean().default(false),
              })
            ),
          })
        ).optional(),
      })
})

const createUpdateFacilityZodSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        contactName: z.string().min(1, "Contact Name is required").optional(),
        email: z.string().email("Invalid email format").optional(),
        phone: z.string().min(1, "Phone is required").optional(),
        address: z.string().min(1, "Address is required").optional(),
        suite: z.string().optional(),
        notificationEmail1: z.string().email("Invalid email format").optional(),
        notificationEmail2: z.string().email("Invalid email format").optional(),
        fax: z.string().optional(),
        accountType: z.string().min(1, "Account Type is required").optional(),
        representative: z.string().min(1, "Representative is required").optional(),
        doctors: z.array(z.string()).optional(), // Assuming ObjectId stored as a string
    })
})

export const FacilityValidation = {
    createFaciliyValidationZodSchema,
    createUpdateFacilityZodSchema,
}