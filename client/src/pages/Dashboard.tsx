import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { useGetAttendance } from "@/hooks/attendance/useGetAttendance";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { isToday } from "date-fns";
import { useMemo } from "react";

export default function Dashboard() {
    const { data: attendance } = useGetAttendance();

    const todaysAttendance = useMemo(() => {
        if (attendance) {
            return attendance.filter((attend) => {
                return isToday(attend.createdAt);
            });
        }
        return [];
    }, [attendance]);

    console.log("todaysAttendance", todaysAttendance);

    const timelogs =
        todaysAttendance?.reduce(
            (acc, curr) => {
                return {
                    ...acc,
                    clockIn: curr.clockIn ? acc.clockIn + 1 : acc.clockIn,
                    clockOut: curr.clockOut ? acc.clockOut + 1 : acc.clockOut,
                };
            },
            { clockIn: 0, clockOut: 0 }
        ) || 0;

    const completeAttendance =
        todaysAttendance?.reduce((acc, curr) => {
            if (curr.clockIn && curr?.clockOut) {
                return acc + 1;
            }
        }, 0) || 0;

    return (
        // <Stack direction="row" gap="8px">
        //     <Paper
        //         elevation={2}
        //         sx={{
        //             width: "100px",
        //             height: "100px",
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}
        //     >
        //         In:
        //         {timelogs?.clockIn}
        //     </Paper>
        //     <Paper
        //         elevation={2}
        //         sx={{
        //             width: "100px",
        //             height: "100px",
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}
        //     >
        //         Out:
        //         {timelogs?.clockOut}
        //     </Paper>

        //     <Paper
        //         elevation={2}
        //         sx={{
        //             width: "100px",
        //             height: "100px",
        //             display: "flex",
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}
        //     >
        //         Complete attendance:
        //         {completeAttendance}
        //     </Paper>
        // </Stack>

        <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={0}
                    sx={{
                        height: "150px",
                        bgcolor: "background.default",
                        p: "16px",
                    }}
                >
                    <Stack flex={1} height="100%">
                        <Typography fontSize={"12px"} fontWeight={700}>
                            Today's Total Clocked In
                        </Typography>

                        <Stack
                            direction="row"
                            flex={1}
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Typography fontSize={"64px"} fontWeight={700}>
                                {new Intl.NumberFormat("en-IN").format(
                                    (timelogs?.clockIn as number) || 0
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={0}
                    sx={{
                        height: "150px",
                        bgcolor: "background.default",
                        p: "16px",
                    }}
                >
                    <Stack flex={1} height="100%">
                        <Typography fontSize={"12px"} fontWeight={700}>
                            Today's Total Clocked Out
                        </Typography>

                        <Stack
                            direction="row"
                            flex={1}
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Typography fontSize={"64px"} fontWeight={700}>
                                {new Intl.NumberFormat("en-IN").format(
                                    (timelogs?.clockOut as number) || 0
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={0}
                    sx={{
                        height: "150px",
                        bgcolor: "background.default",
                        p: "16px",
                    }}
                >
                    <Stack flex={1} height="100%">
                        <Typography fontSize={"12px"} fontWeight={700}>
                            Today's Complete Attendance
                        </Typography>

                        <Stack
                            direction="row"
                            flex={1}
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Typography fontSize={"64px"} fontWeight={700}>
                                {new Intl.NumberFormat("en-IN").format(
                                    completeAttendance as number
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            {/* <Grid item xs={3}>
                <Typography>test</Typography>
            </Grid> */}

            <Grid item xs={12}>
                <Box>
                    <AttendanceTable showDate={false} todayOnly />
                </Box>
            </Grid>
        </Grid>
    );
}
