import { Link, useNavigate } from "react-router-dom";
import {
    CreateAuthFormSchema,
    createAuthFormSchema,
} from "@/schema/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { FC, useState } from "react";
import { useRegister } from "@/hooks/auth/useRegister";

import { DevTool } from "@hookform/devtools";
import {
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Box,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const RegisterForm: FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        register(values, {
            onSuccess: () => {
                toast.success(`New ${role} has been created successfully.`, {
                    duration: 5000,
                });
                navigate("/login");
            },
            onError: (err) => {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data.message, { duration: 5000 });
                }
            },
        });
    };

    return (
        <FormProvider {...form}>
            <Stack
                component="form"
                width={"600px"}
                gap="16px"
                p="24px"
                sx={{ borderRadius: "8px", border: "1px solid #c9c7bf" }}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Stack gap="8px" textAlign="center">
                    <Typography fontSize="30px" fontWeight={700}>
                        Create an account
                    </Typography>

                    <Typography sx={{ textWrap: "balance", color: "#7a786d" }}>
                        Enter your details below to register your account
                    </Typography>
                </Stack>
                <Stack gap="8px">
                    <Controller
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <Stack direction="row" justifyContent="center">
                                <Tabs
                                    {...field}
                                    onChange={(_e, value) => {
                                        field.onChange(value);
                                    }}
                                >
                                    <Tab label="Student" value="student" />
                                    <Tab label="Teacher" value="teacher" />
                                </Tabs>
                            </Stack>
                        )}
                    />

                    <div className="flex gap-3 flex-row">
                        <Controller
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <Stack gap="4px" flex={1}>
                                    <Typography
                                        fontWeight={500}
                                        fontSize="14px"
                                    >
                                        First name
                                    </Typography>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        size="small"
                                        error={Boolean(
                                            form.formState.errors?.firstName
                                        )}
                                        helperText={
                                            form.formState.errors?.firstName
                                                ?.message as string
                                        }
                                    />
                                </Stack>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <Stack gap="4px" flex={1}>
                                    <Typography
                                        fontWeight={500}
                                        fontSize="14px"
                                    >
                                        Last name
                                    </Typography>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        size="small"
                                        error={Boolean(
                                            form.formState.errors?.lastName
                                        )}
                                        helperText={
                                            form.formState.errors?.lastName
                                                ?.message as string
                                        }
                                    />
                                </Stack>
                            )}
                        />
                    </div>

                    {role === "student" && (
                        <Controller
                            control={form.control}
                            name="lrn"
                            render={({ field }) => (
                                <Stack gap="4px">
                                    <Typography
                                        fontWeight={500}
                                        fontSize="14px"
                                    >
                                        LRN
                                    </Typography>
                                    <TextField
                                        {...field}
                                        size="small"
                                        error={Boolean(
                                            form.formState.errors?.lrn
                                        )}
                                        helperText={
                                            form.formState.errors?.lrn
                                                ?.message as string
                                        }
                                    />
                                </Stack>
                            )}
                        />
                    )}

                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <Stack gap="4px">
                                <Typography fontWeight={500} fontSize="14px">
                                    Email
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
                                    type={showPassword ? "text" : "password"}
                                    disabled={isCreating}
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

                    <Controller
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <Stack gap="4px">
                                <Typography fontWeight={500} fontSize="14px">
                                    Confirm password
                                </Typography>
                                <TextField
                                    {...field}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    disabled={isCreating}
                                    size="small"
                                    error={Boolean(
                                        form.formState.errors?.confirmPassword
                                    )}
                                    helperText={
                                        form.formState.errors?.confirmPassword
                                            ?.message as string
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    {showConfirmPassword ? (
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

                <Button type="submit" variant="contained" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create"}
                </Button>

                <Box textAlign="center" mt="16px">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Login
                    </Link>
                </Box>
            </Stack>

            <DevTool control={form.control} />
        </FormProvider>
    );
};
