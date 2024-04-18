import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../useAxios";

export const useLogin = () => {
    const axios = useAxios();

    return useMutation({
        mutationKey: ["auth"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/auth/sign-in", data);

            if (res.status === 200) return res.data;
        },
    });
};
