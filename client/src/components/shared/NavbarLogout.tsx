import {
    Stack,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    List,
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const NavbarLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { setAuth } = useAuth();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        queryClient.removeQueries();
        setAuth("");

        localStorage.removeItem("accessToken");

        navigate("/login");
    };
    return (
        <Stack>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    p: "16px",
                    boxSizing: "border-box",
                }}
            >
                <ListItemButton
                    onClick={handleClickOpen}
                    sx={{
                        borderRadius: "8px",
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItemButton>
            </List>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Logout?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogout} autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};
