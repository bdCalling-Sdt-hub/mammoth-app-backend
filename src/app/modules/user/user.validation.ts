import { z } from 'zod';

const createUserZodSchema =z.object({
  body: z.object({
    firstname: z.string({ required_error: 'FirstName is required' }),
    lastname:z.string({ required_error: 'LastName is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    address: z.string({ required_error: 'Address is required' }),
    image: z.any({ required_error:"Image is required"}),
    signature : z.any().optional(),
    company_name: z.string({ required_error: 'Company name is required'}),
    npi_number: z.string({ required_error: 'Npi number is required'}).optional(),
    apt_number: z.string({ required_error: 'apt number is required'}).optional(),
    facility_location: z.string().optional(),
    role:z.string({ required_error: 'Role is required'}),
    phone: z.string({ required_error: 'Phone is required'})
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    contact: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    image: z.any().optional(),
    signature: z.any().optional(),
    company_name: z.string().optional(),
    npi_number: z.string().optional(),
    apt_number: z.string().optional(),
    facility_location: z.string().optional(),
    role: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
