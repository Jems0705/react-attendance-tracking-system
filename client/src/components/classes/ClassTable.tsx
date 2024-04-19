import { DataTable } from "@/components/shared/DataTable";
import { DataTableColumnHeader } from "@/components/shared/DataTableColumnHeader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Class, useGetClasses } from "@/hooks/class/useGetClasses";
import { Button } from "@mui/material";
import { Button as ShadCNButton } from "@/components/ui/button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, QrCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const ClassTable = () => {
    const navigate = useNavigate();
    const { data: classes } = useGetClasses();

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
        },
        {
            field: "students",
            headerName: "No. of Students",
            valueGetter: (_value, row) => {
                return row.students.length;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
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
                                    navigate(`/classes/${params.row._id}`)
                                }
                            >
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(`/classes/${params.row._id}/edit`)
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <section className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-1">
                <Button
                    variant="contained"
                    component={Link}
                    to="/classes/new"
                    endIcon={<Plus />}
                >
                    new
                </Button>
            </div>
            <DataGrid
                autoHeight
                columns={columns}
                rows={classes || []}
                getRowId={(row) => row._id}
            />
        </section>
    );
};
