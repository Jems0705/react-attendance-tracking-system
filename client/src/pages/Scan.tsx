import { useRouteMatch } from "@/hooks/useRouteMatch";
import { Button, Stack, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

export default function Scan() {
    const routeMatch = useRouteMatch(["/attendance/scan"]);

    return (
        <div className="flex flex-col h-full gap-3">
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
            <Stack
                component="section"
                flex={1}
                sx={{
                    borderColor: "common.white",
                    borderWidth: "2px",
                    borderRadius: "10px",
                    p: "16px 24px",
                }}
            >
                {routeMatch?.pattern.path === "/attendance/scan" ? (
                    <Typography fontStyle="italic">
                        Select clock in or clock out.
                    </Typography>
                ) : (
                    <Outlet />
                )}
            </Stack>
        </div>
    );
}
