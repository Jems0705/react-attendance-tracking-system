import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export const useUpdateClass = () => {
    const axios = useAxiosPrivate();

    return useMutation({
        mutationKey: ["classes"],
        mutationFn: async (data: any) => {
            const { classId, ...rest } = data;
            const res = await axios.put(`/classes/${classId}`, rest);

            if (res.status === 200) return res.data;
        },
    });
};
