import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export const useClockOut = () => {
    const axios = useAxiosPrivate();

    return useMutation({
        mutationKey: ["attendance"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/attendance/clock-out", data);

            if (res.status === 200) return res.data;
        },
    });
};
