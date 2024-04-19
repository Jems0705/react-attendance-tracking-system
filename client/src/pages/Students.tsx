import { StudentTable } from "@/components/students/StudentTable";
import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Outlet } from "react-router-dom";

export default function Students() {
    const routeMatch = useRouteMatch(["/students/:studentId"]);

    if (routeMatch?.pattern.path === "/students/:studentId") return <Outlet />;

    return <StudentTable />;
}
