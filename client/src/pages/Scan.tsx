import { Button, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Scan() {
    return (
        <div className="flex flex-col h-full gap-3">
            <div className="flex gap-1">
                <Button
                    component={Link}
                    to="/attendance/scan/clock-in"
                    variant="contained"
                >
                    Clock In
                </Button>

                <Button
                    component={Link}
                    to="/attendance/scan/clock-out"
                    variant="contained"
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
                <Outlet />
            </Stack>
        </div>
    );
}
