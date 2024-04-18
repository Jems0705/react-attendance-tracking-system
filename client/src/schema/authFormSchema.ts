import { z } from "zod";

export const authFormSchema = z.object({
    role: z.string().refine((value) => value !== "none" && value, {
        message: "Role is required.",
    }),
    firstName: z.string().min(1, {
        message: "First name is required.",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required.",
    }),
    prn: z.string().min(1, {
        message: "PRN is required.",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email is required.",
        })
        .email({ message: "Invalid Email." }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
    confirmPassword: z.string().min(1, {
        message: "Password is required.",
    }),
});

export type AuthFormSchemaType = z.infer<typeof authFormSchema>;
