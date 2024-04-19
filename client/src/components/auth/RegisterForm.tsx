import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    AuthFormSchemaType,
    CreateAuthFormSchema,
    authFormSchema,
    createAuthFormSchema,
} from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { FC, SyntheticEvent, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRegister } from "@/hooks/auth/useRegister";

import { DevTool } from "@hookform/devtools";
import { Stack, Tab, Tabs, TextField } from "@mui/material";
import toast from "react-hot-toast";

export const RegisterForm: FC = () => {
    const [value, setValue] = useState("student");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const navigate = useNavigate();
    const { mutate: register, isPending: isCreating } = useRegister();

    const form = useForm<CreateAuthFormSchema>({
        defaultValues: {
            role: "student",
            firstName: "",
            lrn: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(createAuthFormSchema),
    });

    const role = useWatch({ name: "role", control: form.control });

    const onSubmit = (values: CreateAuthFormSchema) => {
        console.log("values", values);

        register(values, {
            onSuccess: () => {
                toast.success(`New ${role} has been created successfully.`, {
                    duration: 5000,
                });
                navigate("/login");
            },
        });
    };

    return (
        <Form {...form}>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center justify-center py-12"
                >
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Create an account
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your details below to register to your
                                account
                            </p>
                        </div>

                        <Stack>
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <Tabs
                                            {...field}
                                            onChange={(_e, value) => {
                                                field.onChange(value);
                                            }}
                                        >
                                            <Tab
                                                label="Student"
                                                value="student"
                                            />
                                            <Tab
                                                label="Teacher"
                                                value="teacher"
                                            />
                                        </Tabs>
                                    </FormItem>
                                )}
                            />
                        </Stack>
                        <div className="grid gap-4">
                            <TextField placeholder="TEST" />
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">
                                            First name
                                        </Label>
                                        <Input
                                            {...field}
                                            placeholder="John"
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">
                                            Last name
                                        </Label>
                                        <Input
                                            {...field}
                                            placeholder="Doe"
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            {role === "student" && (
                                <FormField
                                    control={form.control}
                                    name="lrn"
                                    render={({ field }) => (
                                        <div className="grid gap-2">
                                            <Label htmlFor="lrn">LRN</Label>
                                            <Input
                                                {...field}
                                                placeholder="..."
                                                disabled={isCreating}
                                            />
                                            <FormMessage />
                                        </div>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            {...field}
                                            placeholder="test@email.com"
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="confirmPassword">
                                                Confirm password
                                            </Label>
                                        </div>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isCreating}
                            >
                                Create
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
                <div className="hidden bg-muted lg:block">
                    <img
                        // src="/placeholder.svg"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>

            <DevTool control={form.control} />
        </Form>
    );
};
