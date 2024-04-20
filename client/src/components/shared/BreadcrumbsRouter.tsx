import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Breadcrumbs, Link, LinkProps, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
    return <Link {...props} component={RouterLink as any} />;
}

export const BreadcrumbsRouter = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const matchRoute = useRouteMatch([
        "/dashboard",
        "/classes",
        "/classes/:classId",
        "/classes/:classId/edit",
        "/students",
        "/students/:studentId",
        "/attendance",
        "/attendance/scan",
        "/attendance/scan/clock-in",
        "/attendance/scan/clock-out",
        "/profile",
    ]);

    const matchRoutes = matchRoute?.pattern.path.split("/").filter((x) => x);

    console.log(pathnames);
    console.log(matchRoutes);

    const breadcrumbNameMap: { [key: string]: string } = {
        "/dashboard": "Dashboard",
        "/classes": "Classes",
        "/classes/:classId": "Class",
        "/classes/:classId/edit": "Edit",
        "/students": "Students",
        "/students/:studentId": "Student",
        "/attendance": "Attendance",
        "/attendance/scan": "Scan",
        "/attendance/scan/clock-in": "Clock In",
        "/attendance/scan/clock-out": "Clock out",
        "/profile": "Profile",
    };

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "16px" }}>
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {matchRoutes?.map((value, index) => {
                const last = index === matchRoutes?.length - 1;
                const to = `/${matchRoutes?.slice(0, index + 1).join("/")}`;

                console.log("value", value);

                console.log("to", to);

                return last ? (
                    <Typography color="text.primary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter
                        underline="hover"
                        color="inherit"
                        to={to}
                        key={to}
                    >
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
};
