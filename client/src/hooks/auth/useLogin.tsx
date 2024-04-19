import { useMutation } from "@tanstack/react-query";
import axios from "@/services/axios";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["auth"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/auth/sign-in", data);

            if (res.status === 200) return res.data;
        },
    });
};
