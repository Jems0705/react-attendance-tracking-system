import { PaletteOptions } from "@mui/material";

export const lightModePallete: PaletteOptions = {
    primary: {
        main: "#007bff", // Blue
        light: "#42a5f5",
        dark: "#005cb8",
        contrastText: "#fff",
    },
    secondary: {
        main: "#ffc107", // Amber
        light: "#ffec40",
        dark: "#ff9800",
        contrastText: "#000",
    },
    background: {
        default: "#fff",
        paper: "#f5f5f5",
    },
    text: {
        primary: "#000",
        secondary: "#757575",
    },
};

export const darkModePalette: PaletteOptions = {
    primary: {
        main: "#3f51b5", // Indigo
        light: "#7986cb",
        dark: "#002984",
        contrastText: "#fff",
    },
    secondary: {
        main: "#ffc107", // Amber (remains the same)
        light: "#ffec40",
        dark: "#ff9800",
        contrastText: "#000",
    },
    background: {
        default: "#212121",
        paper: "#424242",
    },
    text: {
        primary: "#fff",
        secondary: "#ccc",
    },
};
