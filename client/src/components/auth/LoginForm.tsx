import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthFormSchemaType, authFormSchema } from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth/AuthProvider";

export const LoginForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const { mutate: login, isPending: isLoggingIn } = useLogin();

    const form = useForm<AuthFormSchemaType>({
        resolver: zodResolver(
            authFormSchema.pick({ email: true, password: true })
        ),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: AuthFormSchemaType) => {
        console.log(values);

        login(values, {
            onSuccess: (data) => {
                localStorage.setItem("accessToken", data.accessToken);
                setAuth(data.accessToken);
                navigate("/");
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
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your credentials below to login to your
                                account
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email or PRN
                                        </Label>
                                        <Input
                                            {...field}
                                            placeholder="test@email.com"
                                            disabled={isLoggingIn}
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
                                            disabled={isLoggingIn}
                                        />
                                        <FormMessage />
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoggingIn}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline">
                                Create an account
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
        </Form>
    );
};
