import { useGetAuth } from "@/hooks/auth/useGetAuth";
import { FC, PropsWithChildren } from "react";
import { FullLoader } from "../shared/FullLoader";
import { Navigate } from "react-router-dom";

type AllowedRolesProps = {
    type?: "page" | "component";
    roles: string[];
    strict?: boolean;
};

export const AllowedRoles: FC<AllowedRolesProps & PropsWithChildren> = ({
    type = "component",
    roles,
    children,
}) => {
    const { data: authUser, isLoading, isFetching } = useGetAuth();

    if (roles) {
        const hasAccess = roles.includes(authUser?.role as string);

        if (hasAccess) return children;
    }

    if (isLoading || isFetching) return <FullLoader />;

    return type === "page" ? <Navigate to="/" /> : null;
};
