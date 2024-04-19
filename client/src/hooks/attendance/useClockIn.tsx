import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export const useClockIn = () => {
    const axios = useAxiosPrivate();

    return useMutation({
        mutationKey: ["attendance"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/attendance/clock-in", data);

            if (res.status === 200) return res.data;
        },
    });
};
