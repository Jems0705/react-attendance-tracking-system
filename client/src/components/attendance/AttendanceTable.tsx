import { FC } from "react";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useGetAttendance } from "@/hooks/attendance/useGetAttendance";
import { format } from "date-fns";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useGetAuth } from "@/hooks/auth/useGetAuth";
import roles from "@/data/roles";

type AttendanceTableProps = {
    withScan?: boolean;
};

export const AttendanceTable: FC<AttendanceTableProps> = ({
    withScan = false,
}) => {
    const { data: authUser } = useGetAuth();
    const { data: attendance, isFetching } = useGetAttendance();

    const columns: GridColDef[] = [
        ...(authUser?.role !== roles.STUDENT
            ? [
                  {
                      field: "student",
                      headerName: "Student",
                      width: 300,
                      valueGetter: (_value, row) => {
                          return `${row.student?.firstName || ""} ${
                              row.student?.lastName || ""
                          }`;
                      },
                  },
              ]
            : []),

        {
            field: "class",
            headerName: "Class",
            width: 300,
            valueGetter: (_value, row) => {
                return row.class.name;
            },
        },
        {
            field: "clockIn",
            headerName: "Clock In",
            width: 300,
            valueGetter: (_value, row) => {
                return format(row.clockIn, "h:mm:ss aaa");
            },
        },
        {
            field: "clockOut",
            headerName: "Clock Out",
            width: 300,
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
        <section className="flex flex-1 flex-col gap-2 ">
            {withScan && (
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
            )}

            <Box bgcolor="background.default" p="16px" borderRadius="8px">
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={attendance || []}
                    getRowId={(row) => row._id}
                    loading={isFetching}
                    hideFooterSelectedRowCount
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Box>
        </section>
    );
};
