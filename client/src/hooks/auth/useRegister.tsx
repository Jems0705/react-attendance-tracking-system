import axios from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    return useMutation({
        mutationKey: ["auth"],
        mutationFn: async (data: any) => {
            const res = await axios.post("/auth/sign-up", data);

            if (res.status === 200) return res.data;
        },
    });
};
