import { z } from 'zod';

const createSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is must be a string',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is must be a string',
    }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password is must be a string',
      })
      .min(6, 'Password must be at least 6 characters long'),
    role: z
      .string({
        required_error: 'Role is required',
        invalid_type_error: 'Role must be a string',
      })
      .default('USER')
      .optional(),
    address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address is must be a string',
    }),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['USER', 'ADMIN']).optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    image: z.string().optional(),
  }),
});
export const userCreateValidationSchema = {
  createSignUpValidationSchema,
  updateUserValidationSchema
};
