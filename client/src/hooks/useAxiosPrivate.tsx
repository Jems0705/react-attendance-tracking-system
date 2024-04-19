import { useEffect } from "react";

import { axiosPrivate } from "@/services/axios";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useAxiosPrivate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                const accessToken = auth || localStorage.getItem("accessToken");
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (
                    error?.response?.status === 401 ||
                    error?.response?.status === 403
                ) {
                    queryClient.removeQueries();
                    if (localStorage.getItem("accessToken")) {
                        localStorage.removeItem("accessToken");
                    }

                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosPrivate;
};

export default useAxiosPrivate;
