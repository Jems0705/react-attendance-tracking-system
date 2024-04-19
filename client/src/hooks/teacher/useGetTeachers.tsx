import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type Teacher = {
    _id: string;
    email: string;
    name: string;
    prn: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export const useGetTeachers = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const res = await axios.get<Teacher[]>("/teachers");

            if (res.status === 200) return res.data;
        },
    });
};
