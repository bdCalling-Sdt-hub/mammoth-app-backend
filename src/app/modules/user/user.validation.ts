import { z } from 'zod';

const createUserZodSchema =z.object({
  body: z.object({
    firstName: z.string({ required_error: 'FirstName is required' }),
    lastName:z.string({ required_error: 'LastName is required' }),
    contact: z.string({ required_error: 'Contact is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    address: z.string({ required_error: 'Address is required' }),
    image: z.any({ required_error:"Image is required"}),
    signature : z.any().optional(),
    company_name: z.string({ required_error: 'Company name is required'}),
    npi_number: z.number({ required_error: 'Npi number is required'}).optional(),
    apt_number: z.number({ required_error: 'apt number is required'}).optional(),
    facility_location: z.string().optional(),
    role:z.string({ required_error: 'Role is required'}),
    phone: z.string({ required_error: 'Phone is required'})
  }),
})

const updateUserZodSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  location: z.string().optional(),
  image: z.string().optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
