import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type Student = {
    _id: string;
    email: string;
    name: string;
    lrn: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export const useGetMyStudents = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["students", "my students"],
        queryFn: async () => {
            const res = await axios.get<Student[]>("/students/my-students");

            if (res.status === 200) return res.data;
        },
    });
};
