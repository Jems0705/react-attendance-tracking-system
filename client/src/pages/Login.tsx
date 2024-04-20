import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Login() {
    const queryClient = useQueryClient();
    const { setAuth } = useAuth();

    useEffect(() => {
        queryClient.removeQueries();
        setAuth("");

        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("accessToken");
        }
    }, []);
    return <LoginForm />;
}
