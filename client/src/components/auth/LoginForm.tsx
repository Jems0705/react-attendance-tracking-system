import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Form, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthFormSchemaType, authFormSchema } from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Stack, TextField, Typography } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import toast from "react-hot-toast";

export const LoginForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const { mutate: login, isPending: isLoggingIn } = useLogin();

    const form = useForm<AuthFormSchemaType>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(authFormSchema),
    });

    const onSubmit = (values: AuthFormSchemaType) => {
        console.log(values);

        login(values, {
            onSuccess: (data) => {
                localStorage.setItem("accessToken", data.accessToken);
                setAuth(data.accessToken);
                navigate("/");
            },
            onError: (err) => {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data.message, { duration: 5000 });
                    form.setError("email", {});
                    form.setError("password", {});
                }
            },
        });
    };

    return (
        <FormProvider {...form}>
            <Stack
                component="form"
                width={"400px"}
                gap="24px"
                p="24px"
                sx={{ borderRadius: "8px", border: "1px solid #c9c7bf" }}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Stack gap="8px" textAlign="center">
                    <Typography fontSize="30px" fontWeight={700}>
                        Login
                    </Typography>

                    <Typography sx={{ textWrap: "balance", color: "#7a786d" }}>
                        Enter your credentials below to login to your account
                    </Typography>
                </Stack>
                <Stack gap="8px">
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <Stack gap="4px">
                                <Typography fontWeight={500} fontSize="14px">
                                    Email or LRN
                                </Typography>
                                <TextField
                                    {...field}
                                    size="small"
                                    error={Boolean(
                                        form.formState.errors?.email
                                    )}
                                    helperText={
                                        form.formState.errors?.email
                                            ?.message as string
                                    }
                                />
                            </Stack>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <Stack gap="4px">
                                <Typography fontWeight={500} fontSize="14px">
                                    Password
                                </Typography>
                                <TextField
                                    {...field}
                                    type="password"
                                    size="small"
                                    error={Boolean(
                                        form.formState.errors?.password
                                    )}
                                    helperText={
                                        form.formState.errors?.password
                                            ?.message as string
                                    }
                                />
                            </Stack>
                        )}
                    />
                </Stack>

                <Button>Login</Button>

                <Stack textAlign="center" mt="16px">
                    Don&apos;t have an account?
                    <Link to="/register" className="underline">
                        Create an account
                    </Link>
                </Stack>
            </Stack>

            <DevTool control={form.control} />
        </FormProvider>
    );
};
