import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type AuthUser = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    lrn?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export const useGetAuth = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const res = await axios.get<AuthUser>("/auth/me");

            if (res.status === 200) return res.data;
        },
    });
};
