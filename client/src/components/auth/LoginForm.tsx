import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useLogin";
import { AuthFormSchemaType, authFormSchema } from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth/AuthProvider";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                                    disabled={isLoggingIn}
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
                                    type={showPassword ? "text" : "password"}
                                    disabled={isLoggingIn}
                                    size="small"
                                    error={Boolean(
                                        form.formState.errors?.password
                                    )}
                                    helperText={
                                        form.formState.errors?.password
                                            ?.message as string
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                        )}
                    />
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? "Logging in..." : "Login"}
                </Button>

                <Box textAlign="center" mt="16px">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="underline">
                        Create an account
                    </Link>
                </Box>
            </Stack>

            <DevTool control={form.control} />
        </FormProvider>
    );
};
