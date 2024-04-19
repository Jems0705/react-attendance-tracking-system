import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export const useCreateClass = () => {
    const axios = useAxiosPrivate();

    return useMutation({
        mutationKey: ["classes"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/classes", data);

            if (res.status === 200) return res.data;
        },
    });
};
