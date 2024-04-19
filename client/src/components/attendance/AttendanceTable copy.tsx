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
import {
    Attendance,
    useGetAttendance,
} from "@/hooks/attendance/useGetAttendance";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

import { format } from "date-fns";

export const AttendanceTable = () => {
    const { data: attendance } = useGetAttendance();

    console.log("attendance", attendance);

    const columns: ColumnDef<Attendance>[] = [
        {
            accessorKey: "student",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Student" />
            ),
            cell: ({ row }) =>
                `${row.original.student.firstName} ${row.original.student.lastName}`,
        },
        {
            accessorKey: "class",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Class" />
            ),
            cell: ({ row }) => `${row.original.class.name}`,
        },
        {
            accessorKey: "clockIn",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Clock In" />
            ),
            cell: ({ row }) => format(row.original.clockIn, "h:mm:ss aaa"),
        },
        {
            accessorKey: "clockOut",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Clock Out" />
            ),
            cell: ({ row }) => {
                if (row.original?.clockOut) {
                    return format(row.original.clockOut, "h:mm:ss aaa");
                }
                return <p className="italic">No time out yet.</p>;
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
                            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
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

    return (
        <section className="flex flex-1 flex-col">
            <div className="flex flex-row gap-1">
                <Link to="/attendance/scan">
                    <Button variant="default" className="flex gap-2">
                        Scan <QrCode />
                    </Button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={attendance || []}
                filterName="class"
            />
        </section>
    );
};
