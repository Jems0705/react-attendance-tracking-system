import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";
import { Class } from "./useGetClasses";

type UseGetClassProps = {
    classId: string;
    enable?: boolean;
};
export const useGetClass = ({ classId, enable = true }: UseGetClassProps) => {
    const axios = useAxiosPrivate();

    return useQuery({
        enabled: classId && enable,
        queryKey: ["classes", classId],
        queryFn: async () => {
            const res = await axios.get<Class>(`/classes/${classId}`);

            if (res.status === 200) return res.data;
        },
    });
};
