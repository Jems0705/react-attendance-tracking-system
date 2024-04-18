import axios from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["auth"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/auth/sign-in", data);

            if (res.status === 200) return res.data;
        },
    });
};
