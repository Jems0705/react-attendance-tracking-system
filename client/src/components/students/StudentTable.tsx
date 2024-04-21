import { FC } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useGetMyStudents } from "@/hooks/student/useGetMyStudents";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button as ShadCNButton } from "../ui/button";

import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export const StudentTable: FC = () => {
    const navigate = useNavigate();
    const { data: students, isFetching } = useGetMyStudents();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
        },
        {
            field: "lrn",
            headerName: "LRN",
            width: 200,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "actions",
            headerName: "Actions",
            disableColumnMenu: true,
            disableExport: true,
            disableReorder: true,
            editable: false,
            sortable: false,
            filterable: false,
            width: 300,
            renderCell: (params) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ShadCNButton
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </ShadCNButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(`/students/${params.row._id}`)
                                }
                            >
                                View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <section className="flex flex-1 flex-col gap-2">
            <Box bgcolor="background.default" p="16px" borderRadius="8px">
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={students || []}
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
