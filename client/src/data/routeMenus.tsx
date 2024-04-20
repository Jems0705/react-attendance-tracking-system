import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type RouteMenusType = {
    label: string;
    path: string;
    icon: JSX.Element;
};

const routeMenus: RouteMenusType[] = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Classes", path: "/classes", icon: <SchoolIcon /> },
    { label: "Students", path: "/students", icon: <PeopleIcon /> },
    { label: "Attendance", path: "/attendance", icon: <AccessTimeIcon /> },
    { label: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
];

export default routeMenus;
