import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type Class = {
    _id: string;
    name: string;
    teacher: string;
    students: string[];
    createdAt: Date;
    updatedAt: Date;
};

export const useGetClasses = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axios.get<Class[]>("/classes");

            if (res.status === 200) return res.data;
        },
    });
};
