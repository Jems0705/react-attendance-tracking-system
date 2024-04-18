import { ClassTable } from "@/components/classes/ClassTable";
import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Outlet } from "react-router-dom";

export default function Classes() {
    const routeMatch = useRouteMatch(["/classes/new", "/classes"]);

    if (routeMatch?.pattern.path === "/classes/new") return <Outlet />;

    return <ClassTable />;
}
