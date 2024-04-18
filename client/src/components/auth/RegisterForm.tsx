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
import { AuthFormSchemaType, authFormSchema } from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRegister } from "@/hooks/auth/useRegister";

import { DevTool } from "@hookform/devtools";

export const RegisterForm: FC = () => {
    const navigate = useNavigate();
    const { mutate: register, isPending: isCreating } = useRegister();

    const form = useForm<AuthFormSchemaType>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            role: "student",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: AuthFormSchemaType) => {
        console.log(values);

        register(values, { onSuccess: () => navigate("/") });
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
                        <div className="grid gap-4">
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

                            <FormField
                                control={form.control}
                                name="prn"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor="prn">PRN</Label>
                                        <Input
                                            {...field}
                                            placeholder="..."
                                            disabled={isCreating}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

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

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="student" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Student
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="teacher" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Teacher
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
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
