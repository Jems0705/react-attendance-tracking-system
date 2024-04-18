import { useAuthContext } from "@/contexts/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    // const { accessToken } = useAuthContext();

    // console.log("accesstoken", accessToken);

    // if (!accessToken) return <Navigate to="/login" />;

    return <Outlet />;
};
