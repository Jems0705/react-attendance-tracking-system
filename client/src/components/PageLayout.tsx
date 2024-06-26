import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { useSidebar } from "@/contexts/SidebarProvider";
import { BreadcrumbsRouter } from "./shared/BreadcrumbsRouter";

export const PageLayout = () => {
    const { drawerWidth, isClosing, mobileOpen, handleDrawerToggle } =
        useSidebar();

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    // ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Navbar />
            </Box>
            <Box
                component="main"
                sx={{
                    // height: "90vh",
                    height: "100%",
                    bgcolor: "#f5f5f5",
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />

                <BreadcrumbsRouter />

                <Outlet />
            </Box>
        </Box>
    );
};
