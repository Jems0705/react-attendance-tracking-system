import { useAuth } from "@/contexts/auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { auth } = useAuth();

    const accessToken = auth || localStorage.getItem("accessToken");

    if (!accessToken) return <Navigate to="/login" />;

    return <Outlet />;
};
