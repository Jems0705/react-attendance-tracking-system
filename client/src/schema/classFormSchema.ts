import { z } from "zod";

const teacherSchema = z.object({
    role: z.literal("teacher"),
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    students: z.array(z.string()),
});

const adminSchema = z.object({
    role: z.literal("admin"),
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    teacher: z.string().refine((value) => value && value !== "none", {
        message: "Teacher is required.",
    }),
    students: z.array(z.string()),
});

export const classFormSchema = z.discriminatedUnion("role", [
    teacherSchema,
    adminSchema,
]);

export type ClassFormSchemaType = z.infer<typeof classFormSchema>;
