import { z } from "zod";

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Invalid email",
        }).email("Invalid email format"),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Invalid password",
        }),
    }),
});
export const authValidation = {
    userLoginValidationSchema
}