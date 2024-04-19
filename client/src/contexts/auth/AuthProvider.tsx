import { Dispatch, createContext, useContext, useState } from "react";

type AuthContextProps = {
    children: React.ReactNode;
};

type AuthContextState = {
    auth: string | null | undefined;
    setAuth: Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function AuthProvider({ children }: AuthContextProps) {
    const [auth, setAuth] = useState("");

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error("useAuth must be used within a Auth Provider");

    return context;
};
