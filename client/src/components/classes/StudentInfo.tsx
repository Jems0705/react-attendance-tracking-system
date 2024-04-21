import { useGetStudent } from "@/hooks/student/useGetStudent";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { AttendanceTable } from "../attendance/AttendanceTable";

export const StudentInfo = () => {
    const { studentId } = useParams();

    const { data: student, isFetching } = useGetStudent({
        studentId: studentId as string,
    });

    return (
        <Stack>
            <Paper
                sx={{
                    p: "16px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
                elevation={2}
            >
                <Stack gap="16px">
                    <Typography variant="h6">Student Details</Typography>
                    <Stack gap="8px">
                        <Stack gap="4px">
                            <Typography variant="caption" fontWeight={700}>
                                Name
                            </Typography>
                            {isFetching ? (
                                <Skeleton variant="text" width="100px" />
                            ) : (
                                <Typography variant="subtitle2">
                                    {student?.name}
                                </Typography>
                            )}
                        </Stack>

                        <Stack gap="4px">
                            <Typography variant="caption" fontWeight={700}>
                                LRN
                            </Typography>
                            {isFetching ? (
                                <Skeleton variant="text" width="100px" />
                            ) : (
                                <Typography variant="subtitle2">
                                    {student?.lrn}
                                </Typography>
                            )}
                        </Stack>

                        <Stack gap="4px">
                            <Typography variant="caption" fontWeight={700}>
                                Email
                            </Typography>
                            {isFetching ? (
                                <Skeleton variant="text" width="100px" />
                            ) : (
                                <Typography variant="subtitle2">
                                    {student?.email}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack>
                    <Typography variant="h6">Attendance</Typography>

                    <AttendanceTable
                        studentId={studentId}
                        showStudent={false}
                    />
                </Stack>
            </Paper>
        </Stack>
    );
};
