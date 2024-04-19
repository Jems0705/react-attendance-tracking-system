import InboxIcon from "@mui/icons-material/MoveToInbox";

type RouteMenusType = {
    label: string;
    path: string;
    icon: JSX.Element;
};

const routeMenus: RouteMenusType[] = [
    { label: "Dashboard", path: "/dashboard", icon: <InboxIcon /> },
    { label: "Classes", path: "/classes", icon: <InboxIcon /> },
    { label: "Students", path: "/students", icon: <InboxIcon /> },
    { label: "Attendance", path: "/attendance", icon: <InboxIcon /> },
    { label: "Profile", path: "/profile", icon: <InboxIcon /> },
];

export default routeMenus;
