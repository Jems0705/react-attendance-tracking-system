import { DataTable } from "@/components/attendance/DataTable";
import { DataTableColumnHeader } from "@/components/attendance/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, QrCode } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

type StudentAttendance = {
    id: string;
    name: string;
    class: string;
    timeIn: string;
    timeOut: string;
};

export default function Attendance() {
    const location = useLocation();

    const columns: ColumnDef<StudentAttendance>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "class",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Class" />
            ),
        },
        {
            accessorKey: "timeIn",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Time In" />
            ),
        },
        {
            accessorKey: "timeOut",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Time Out" />
            ),
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
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>
                                View payment details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const data = [
        {
            id: "728ed52f",
            name: "James Santos",
            class: "3BSIT4B",
            timeIn: "10:01AM",
            timeOut: "-",
        },
        {
            id: "542ercs4",
            name: "John Doe",
            class: "2BSIT4B",
            timeIn: "10:02AM",
            timeOut: "-",
        },
        // ...
    ];

    if (location.pathname.includes("scan")) return <Outlet />;

    return (
        <div>
            <div className="flex flex-row gap-1">
                <Button variant="default">
                    <Link to="/attendance/scan">Scan</Link>
                    <QrCode className="pl-1" />
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
