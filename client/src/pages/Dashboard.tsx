import { useAuth } from "@/contexts/auth/AuthProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect } from "react";

export default function Dashboard() {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();

    useEffect(() => {
        const test = async () => {
            const data = await axios.get("/teachers");

            console.log("data", data);
        };

        console.log(test());
    }, []);
    return <div>Dashboard</div>;
}
