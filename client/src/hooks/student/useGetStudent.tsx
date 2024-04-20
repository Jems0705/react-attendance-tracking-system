import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { Student } from "./useGetStudents";

type UseGetStudentProps = {
    studentId: string;
    enable?: boolean;
};
export const useGetStudent = ({
    studentId,
    enable = true,
}: UseGetStudentProps) => {
    const axios = useAxiosPrivate();

    return useQuery({
        enabled: Boolean(studentId) && enable,
        queryKey: ["classes", studentId],
        queryFn: async () => {
            const res = await axios.get<Student>(`/students/${studentId}`);

            if (res.status === 200) return res.data;
        },
    });
};
