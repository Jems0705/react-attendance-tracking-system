import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { Class } from "../class/useGetClasses";

export type Attendance = {
    _id: string;
    student: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    class: Pick<Class, "_id" | "name">;
    clockIn: Date;
    clockOut: Date;
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
