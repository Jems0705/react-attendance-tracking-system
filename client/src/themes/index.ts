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
        // palette: {
        //     mode: "dark",
        //     // primary: {
        //     //     main: "#1976d2",
        //     // },
        //     // secondary: {
        //     //     main: "#2ec5d3",
        //     // },
        //     // background: {
        //     //     default: "#192231",
        //     //     paper: "#24344d",
        //     // },
        // },
        palette: {
            mode,
            ...(mode === "light" ? lightModePallete : darkModePalette),
        },

        typography: typography,
    });
};
