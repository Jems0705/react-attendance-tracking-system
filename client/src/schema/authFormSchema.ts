import { z } from "zod";

export const authFormSchema = z.object({
    email: z.string().min(1, {
        message: "Email/LRN is required.",
    }),

    password: z.string().min(1, {
        message: "Password is required.",
    }),
});

const teacherSchema = z.object({
    role: z.literal("teacher"),
    firstName: z.string().min(1, {
        message: "First name is required.",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required.",
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
        message: "Confirm password is required.",
    }),
});

const studentSchema = z.object({
    role: z.literal("student"),
    firstName: z.string({ required_error: "First name is required." }).min(1, {
        message: "First name is required.",
    }),
    lastName: z.string({ required_error: "Last name is required." }).min(1, {
        message: "Last name is required.",
    }),
    lrn: z.string({ required_error: "LRN is required." }).min(1, {
        message: "LRN is required.",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email is required.",
        })
        .email({ message: "Invalid Email." }),
    password: z.string({ required_error: "Password is required." }).min(1, {
        message: "Password is required.",
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm password is required.",
    }),
});

export const createAuthFormSchema = z
    .discriminatedUnion("role", [teacherSchema, studentSchema])
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
    });

export type CreateAuthFormSchema = z.infer<typeof createAuthFormSchema>;
export type AuthFormSchemaType = z.infer<typeof authFormSchema>;
