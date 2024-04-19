import { ClassTable } from "@/components/classes/ClassTable";
import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Outlet } from "react-router-dom";

export default function Classes() {
    const routeMatch = useRouteMatch([
        "/classes/new",
        "/classes",
        "/classes/:classId",
        "/classes/:classId/edit",
    ]);

    if (routeMatch?.pattern.path === "/classes/new") return <Outlet />;
    if (routeMatch?.pattern.path === "/classes/:classId") return <Outlet />;
    if (routeMatch?.pattern.path === "/classes/:classId/edit")
        return <Outlet />;

    return <ClassTable />;
}
