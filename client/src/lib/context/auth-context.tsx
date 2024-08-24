import React, {
    createContext,
    useContext,
    Dispatch,
    type ReactNode,
} from "react";
import { LoginResponse } from "../../interfaces/auth";
import { isAuthenticated } from "../api/auth";

export interface AuthContextType {
    userdetails : LoginResponse;
    setUserdetails: Dispatch<React.SetStateAction<LoginResponse>>;
    isLoggedin: boolean;
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {

    const [userdetails, setUserdetails] = React.useState({} as LoginResponse);

    const [isLoggedin, setIsLoggedin] = React.useState(isAuthenticated());
    
    return (
        <AuthContext.Provider 
            value={{
                userdetails,
                setUserdetails,
                isLoggedin,
                setIsLoggedin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            "useItineraryContext must be used within an ItineraryContextProvider"
        );
    }
    return context;
};