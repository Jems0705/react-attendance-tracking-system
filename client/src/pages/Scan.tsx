import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Button, Stack, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function Scan() {
    const routeMatch = useRouteMatch(["/attendance/scan"]);

    return (
        <Stack
            gap="12px"
            bgcolor="background.default"
            p="16px"
            borderRadius="8px"
        >
            <div className="flex gap-1">
                <Button
                    component={NavLink}
                    to="/attendance/scan/clock-in"
                    variant="contained"
                    sx={{
                        "&.active": {
                            bgcolor: "primary.dark",
                            "&:hover": {
                                bgcolor: "primary.light",
                            },
                        },
                    }}
                >
                    Clock In
                </Button>

                <Button
                    component={NavLink}
                    to="/attendance/scan/clock-out"
                    variant="contained"
                    sx={{
                        "&.active": {
                            bgcolor: "primary.dark",
                            "&:hover": {
                                bgcolor: "primary.light",
                            },
                        },
                    }}
                >
                    Clock Out
                </Button>
            </div>
            <Stack component="section" flex={1}>
                {routeMatch?.pattern.path === "/attendance/scan" ? (
                    <Typography fontStyle="italic">
                        Select clock in or clock out.
                    </Typography>
                ) : (
                    <Outlet />
                )}
            </Stack>
        </Stack>
    );
}
