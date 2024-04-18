import axios from "@/services/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAxios = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // const requestResponse = axios.interceptors.request.use(
        //     (response) => response,
        //     async (error) => {
        //         const originalRequest = error.config;

        //         if (error.status === 401) {
        //             const res = await axios.get("/auth/refresh");

        //             if (res.status === 401 || res.status === 403) {
        //                 navigate("/login");

        //                 return Promise.reject(error);
        //             }

        //             originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        //             return axios(originalRequest);

        //             // return Promise.reject(error);
        //         }
        //     }
        // );

        const responseIntercept = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.status === 401) {
                    const res = await axios.get("/auth/refresh");

                    if (res.status === 401 || res.status === 403) {
                        navigate("/login");

                        return Promise.reject(error);
                    }

                    originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

                    return axios(originalRequest);

                    // return Promise.reject(error);
                }
            }
        );

        return () => {
            axios.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axios;
};
