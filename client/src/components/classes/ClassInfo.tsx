import { useGetClass } from "@/hooks/class/useGetClass";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

export const ClassInfo = () => {
    const { classId } = useParams();

    const { data: _class, isFetching } = useGetClass({
        classId: classId as string,
    });

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 300,
            valueGetter: (_value, row) => {
                console.log("rpw", row);
                return `${row?.firstName || ""} ${row?.lastName || ""}`;
            },
        },
        {
            field: "lrn",
            headerName: "LRN",
            width: 300,
        },
        {
            field: "email",
            headerName: "Email",
            width: 300,
        },
    ];

    return (
        <Stack p="16px" bgcolor="background.default" border="8px">
            <Stack gap="16px">
                <Stack gap="4px">
                    <Typography variant="caption" fontWeight={700}>
                        Class name
                    </Typography>
                    {isFetching ? (
                        <Skeleton variant="text" width="100px" />
                    ) : (
                        <Typography variant="subtitle2">
                            {_class?.name}
                        </Typography>
                    )}
                </Stack>

                <Stack gap="4px">
                    <Typography variant="caption" fontWeight={700}>
                        Assigned teacher
                    </Typography>

                    {isFetching ? (
                        <Skeleton variant="text" width="100px" />
                    ) : (
                        <Typography variant="subtitle2">{`${_class?.teacher?.firstName} ${_class?.teacher?.lastName}`}</Typography>
                    )}
                </Stack>

                <Stack gap="4px">
                    <Typography variant="caption" fontWeight={700}>
                        Students
                    </Typography>

                    <DataGrid
                        autoHeight
                        columns={columns}
                        rows={_class?.students || []}
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
                </Stack>
            </Stack>
        </Stack>
    );
};
