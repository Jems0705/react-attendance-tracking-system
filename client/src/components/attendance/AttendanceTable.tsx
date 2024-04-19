import { FC } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAttendance } from "@/hooks/attendance/useGetAttendance";
import { format } from "date-fns";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const AttendanceTable: FC = () => {
    const { data: attendance } = useGetAttendance();

    const columns: GridColDef[] = [
        {
            field: "student",
            headerName: "Student",
            valueGetter: (_value, row) => {
                return `${row.student?.firstName || ""} ${
                    row.student?.lastName || ""
                }`;
            },
        },
        {
            field: "class",
            headerName: "Class",
            valueGetter: (_value, row) => {
                return row.class.name;
            },
        },
        {
            field: "clockIn",
            headerName: "Clock In",
            valueGetter: (_value, row) => {
                return format(row.clockIn, "h:mm:ss aaa");
            },
        },
        {
            field: "clockOut",
            headerName: "Clock Out",
            valueGetter: (_value, row) => {
                if (row?.clockOut) {
                    return format(row.clockOut, "h:mm:ss aaa");
                }
                return "No time out yet.";
            },
            renderCell: (value) => {
                if (!value.row?.clockOut) {
                    return <p className="italic">{value.formattedValue}</p>;
                }

                return value.formattedValue;
            },
        },
    ];

    return (
        <section className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-1">
                <Button
                    variant="contained"
                    component={Link}
                    to="/attendance/scan"
                    endIcon={<QrCode />}
                >
                    Scan
                </Button>
            </div>
            <DataGrid
                autoHeight
                columns={columns}
                rows={attendance || []}
                getRowId={(row) => row._id}
            />
        </section>
    );
};
