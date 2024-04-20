import { LoginForm } from "@/components/auth/LoginForm";
import { useEffect } from "react";

export default function Login() {
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("accessToken");
        }
    }, []);
    return <LoginForm />;
}
