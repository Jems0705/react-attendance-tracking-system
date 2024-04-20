import { useGetStudent } from "@/hooks/student/useGetStudent";
import { Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const StudentInfo = () => {
    const { studentId } = useParams();

    const { data: student } = useGetStudent({ studentId: studentId as string });

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
                <Typography variant="h6">Student Details</Typography>
                <Stack gap="8px">
                    <Stack gap="4px">
                        <Typography variant="caption" fontWeight={700}>
                            Name
                        </Typography>
                        <Typography variant="subtitle2">
                            {student?.name}
                        </Typography>
                    </Stack>

                    <Stack gap="4px">
                        <Typography variant="caption" fontWeight={700}>
                            LRN
                        </Typography>
                        <Typography variant="subtitle2">
                            {student?.lrn}
                        </Typography>
                    </Stack>

                    <Stack gap="4px">
                        <Typography variant="caption" fontWeight={700}>
                            Email
                        </Typography>
                        <Typography variant="subtitle2">
                            {student?.email}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
