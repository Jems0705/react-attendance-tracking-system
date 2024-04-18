import { Dispatch, createContext, useContext, useState } from "react";

type AuthContextProps = {
    children: React.ReactNode;
};

type AuthContextState = {
    accessToken: string | null;
    setAccessToken: Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function AuthContextProvider({ children }: AuthContextProps) {
    const [accessToken, setAccessToken] = useState("");

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error("useAuth must be used within a ThemeProvider");

    return context;
};
