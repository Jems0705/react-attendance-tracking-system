import { createContext, useContext, useState } from "react";

type SidebarContextProps = {
    children: React.ReactNode;
};

type SidebarContextState = {
    drawerWidth: number;
    mobileOpen: boolean;
    isClosing: boolean;
    handleDrawerClose: () => void;
    handleDrawerTransitionEnd: () => void;
    handleDrawerToggle: () => void;
};

const SidebarContext = createContext<SidebarContextState>(
    {} as SidebarContextState
);

export function SidebarProvider({ children }: SidebarContextProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <SidebarContext.Provider
            value={{
                drawerWidth: 240,
                mobileOpen,
                isClosing,
                handleDrawerClose,
                handleDrawerTransitionEnd,
                handleDrawerToggle,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (context === undefined)
        throw new Error("useSidebar must be used within a Sidebar Provider");

    return context;
};
