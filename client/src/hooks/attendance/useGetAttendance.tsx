import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export type Attendance = {
    _id: string;
    name: string;
    teacher: string;
    students: string[];
    createdAt: Date;
    updatedAt: Date;
};

export const useGetAttendance = () => {
    const axios = useAxiosPrivate();

    return useQuery({
        queryKey: ["attendance"],
        queryFn: async () => {
            const res = await axios.get<Attendance[]>("/attendance");

            if (res.status === 200) return res.data;
        },
    });
};
