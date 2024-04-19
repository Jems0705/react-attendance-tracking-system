import { FC } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useGetStudents } from "@/hooks/student/useGetStudents";

export const StudentTable: FC = () => {
    const { data: students } = useGetStudents();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
        },
        {
            field: "lrn",
            headerName: "LRN",
        },
        {
            field: "email",
            headerName: "Email",
        },
    ];

    return (
        <section className="flex flex-1 flex-col gap-2">
            {/* <div className="flex flex-row gap-1">
                <Button
                    variant="contained"
                    component={Link}
                    to="/attendance/scan"
                    endIcon={<QrCode />}
                >
                    Scan
                </Button>
            </div> */}
            <DataGrid
                autoHeight
                columns={columns}
                rows={students || []}
                getRowId={(row) => row._id}
            />
        </section>
    );
};
