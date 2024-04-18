import { AttendanceTable } from "@/components/attendance/AttendanceTable";

import { Outlet, useLocation } from "react-router-dom";

export default function Attendance() {
    const location = useLocation();

    if (location.pathname.includes("scan")) return <Outlet />;

    return <AttendanceTable />;
}
