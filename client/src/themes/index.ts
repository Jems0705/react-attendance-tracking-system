import { createTheme } from "@mui/material";
import { typography } from "./typography";
import { darkModePalette, lightModePallete } from "./palette";

export enum ThemeVariantsProps {
    light = "light",
    dark = "dark",
}

export const theme = (mode: ThemeVariantsProps) => {
    console.log("mode", mode);
    return createTheme({
        palette: {
            primary: { main: "#009688" },
            secondary: { main: "#FF5722" },
            error: { main: "#F44336" },
            warning: { main: "#FF9800" },
            info: { main: "#1E88E5" },
            success: { main: "#4CAF50" },
            text: {
                primary: "#212121",
                secondary: "#757575",
            },
        },
        // palette: {
        //     mode,
        //     ...(mode === "light" ? lightModePallete : darkModePalette),
        // },

        typography: typography,
    });
};
