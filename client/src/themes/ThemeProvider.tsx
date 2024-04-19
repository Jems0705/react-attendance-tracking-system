import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { ThemeVariantsProps, theme } from "../themes/index";

type ThemeProviderProps = {
    children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <MUIThemeProvider theme={theme(ThemeVariantsProps.light)}>
            {children}
        </MUIThemeProvider>
    );
};

export default ThemeProvider;
