import {
    Stack,
    Toolbar,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import routeMenus from "@/data/routeMenus";
import { useGetAuth } from "@/hooks/auth/useGetAuth";
import roles from "@/data/roles";

export const NavbarMenu = () => {
    const { data: authUser } = useGetAuth();
    const authRole = authUser?.role || "";

    return (
        <Stack gap="48px" flex={1}>
            <Stack>
                <div>
                    <Toolbar />
                    <Divider />
                    <List
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            p: "16px",
                            boxSizing: "border-box",
                        }}
                    >
                        {routeMenus.map((menu) => {
                            const studentUnallowed = [
                                "/students",
                                "/attendance",
                            ];
                            if (
                                authRole &&
                                authRole === roles.STUDENT &&
                                studentUnallowed.includes(menu.path)
                            ) {
                                return;
                            }
                            return (
                                <ListItemButton
                                    key={menu.path}
                                    component={NavLink}
                                    to={menu.path}
                                >
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItemButton>
                            );
                        })}
                        {/* {["Dashboard", "Classes", "Students", "Attendance"].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        component={NavLink}
                                        to="/attendance/clock-in"
                                    >
                                        <ListItemIcon>
                                            {index % 2 === 0 ? (
                                                <InboxIcon />
                                            ) : (
                                                <MailIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        )} */}
                    </List>
                </div>
            </Stack>
        </Stack>
    );
};
