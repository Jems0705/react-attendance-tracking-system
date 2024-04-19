import { Drawer } from "@mui/material";
import { NavbarMenu } from "./NavbarMenu";
import { useSidebar } from "@/contexts/SidebarProvider";

export const Navbar = () => {
    const {
        drawerWidth,
        mobileOpen,
        handleDrawerTransitionEnd,
        handleDrawerClose,
    } = useSidebar();

    return (
        <div>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <NavbarMenu />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                <NavbarMenu />
            </Drawer>
        </div>
    );
};