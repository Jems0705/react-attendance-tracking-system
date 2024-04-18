import { z } from "zod";

export const classFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    teacher: z.string().refine((value) => value && value !== "none", {
        message: "Teacher is required.",
    }),
    students: z.array(z.string()),
});

export type ClassFormSchemaType = z.infer<typeof classFormSchema>;
