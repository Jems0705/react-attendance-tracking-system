import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type Student = {
    _id: string;
    email: string;
    name: string;
    prn: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export const useGetStudents = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const res = await axios.get<Student[]>("/students");

            if (res.status === 200) return res.data;
        },
    });
};
