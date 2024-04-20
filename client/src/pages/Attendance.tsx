import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { AllowedRoles } from "@/components/auth/AllowedRoles";
import roles from "@/data/roles";
import { Stack } from "@mui/material";

import { Outlet, useLocation } from "react-router-dom";

export default function Attendance() {
    const location = useLocation();

    if (location.pathname.includes("scan")) return <Outlet />;

    return (
        <Stack flex={1} height="100%">
            <AllowedRoles roles={[roles.TEACHER]}>
                <AttendanceTable withScan />
            </AllowedRoles>

            <AllowedRoles roles={[roles.STUDENT]}>
                <AttendanceTable />
            </AllowedRoles>
        </Stack>
    );
}
