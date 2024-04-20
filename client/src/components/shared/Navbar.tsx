import { Drawer } from "@mui/material";
import { NavbarMenu } from "./NavbarMenu";
import { useSidebar } from "@/contexts/SidebarProvider";
import { NavbarLogout } from "./NavbarLogout";

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
                <NavbarLogout />
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
                <NavbarLogout />
            </Drawer>
        </div>
    );
};
