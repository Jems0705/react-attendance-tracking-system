import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { useCreateClass } from "@/hooks/class/useCreateClass";

import { ClassFormSchemaType, classFormSchema } from "@/schema/classFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClassForm } from "./ClassForm";
import { Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";

export const ClassCreate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: createClass, isPending: isCreating } = useCreateClass();

    const { data: authUser } = useGetAuth();

    const form = useForm<ClassFormSchemaType>({
        defaultValues: {
            name: "",
            teacher: "",
            students: [],
        },
        values: {
            role: authUser?.role === "teacher" ? "teacher" : "admin",
        },
        resolver: zodResolver(classFormSchema),
    });

    const onSubmit = (values: ClassFormSchemaType) => {
        createClass(values, {
            onSuccess: (data) => {
                toast.success(data.message, {
                    duration: 5000,
                });
                queryClient.invalidateQueries({ queryKey: ["classes"] });

                navigate("/classes");
            },
            onError: (err) => {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data.message, {
                        duration: 5000,
                    });
                }
            },
        });
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <ClassForm />
                <Button type="submit" disabled={isCreating}>
                    Create
                </Button>
            </form>
            <DevTool control={form.control} />
        </FormProvider>
    );
};
