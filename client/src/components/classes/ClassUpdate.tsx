import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { useCreateClass } from "@/hooks/class/useCreateClass";

import { ClassFormSchemaType, classFormSchema } from "@/schema/classFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ClassForm } from "./ClassForm";
import { Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { useGetClass } from "@/hooks/class/useGetClass";
import { useUpdateClass } from "@/hooks/class/useUpdateClass";

export const ClassUpdate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { classId } = useParams();

    const { mutate: updateClass, isPending: isUpdating } = useUpdateClass();

    const { data: authUser } = useGetAuth();
    const { data: _class } = useGetClass({ classId: classId as string });

    console.log("class", _class);

    const form = useForm<ClassFormSchemaType>({
        defaultValues: {
            name: "",
            teacher: "",
            students: [],
        },
        values: {
            name: _class?.name as string,
            students: _class?.students as string[],
            teacher: _class?.teacher as string,
            role: authUser?.role === "teacher" ? "teacher" : "admin",
        },
        resolver: zodResolver(classFormSchema),
    });

    const onSubmit = (values: ClassFormSchemaType) => {
        updateClass(
            { ...values, classId },
            {
                onSuccess: (data) => {
                    console.log("data", data);
                    toast.success(data.message, {
                        duration: 5000,
                    });
                    queryClient.invalidateQueries({ queryKey: ["classes"] });

                    navigate(`/classes/${classId}`);
                },
                onError: (err) => {
                    if (axios.isAxiosError(err)) {
                        toast.error(err.response?.data.message, {
                            duration: 5000,
                        });
                    }
                },
            }
        );
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <ClassForm />
                <Button type="submit" disabled={isUpdating}>
                    Update
                </Button>
            </form>
            <DevTool control={form.control} />
        </FormProvider>
    );
};
