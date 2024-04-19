import { DataTable } from "@/components/shared/DataTable";
import { DataTableColumnHeader } from "@/components/shared/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Class, useGetClasses } from "@/hooks/class/useGetClasses";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

export const ClassTable = () => {
    const { data: classes } = useGetClasses();
    console.log("classes", classes);

    const columns: ColumnDef<Class>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "students",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="No. of Students"
                />
            ),
            cell: ({ row }) => {
                return row.original.students.length;
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => alert("view")}>
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    // const data = [
    //     {
    //         id: "728ed52f",
    //         name: "Class A",
    //         students: 16,
    //     },
    //     {
    //         id: "542ercs4",
    //         name: "Class B",
    //         students: 37,
    //     },
    // ];

    return (
        <section className="flex flex-1 flex-col">
            <div className="flex flex-row gap-1">
                <Link to="/classes/new">
                    <Button variant="default" className="flex gap-2">
                        New Class <Plus />
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={classes || []} />
        </section>
    );
};
