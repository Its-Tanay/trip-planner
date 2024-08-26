import React, {
    createContext,
    useContext,
    Dispatch,
    type ReactNode,
} from "react";
import { LoginResponse } from "../../interfaces/auth";
import { isAuthenticated, getUserDetails } from "../api/auth";

export interface AuthContextType {
    user : LoginResponse;
    setUser: Dispatch<React.SetStateAction<LoginResponse>>;
    isLoggedin: boolean;
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    isLoginDialogOpen: boolean;
    setIsLoginDialogOpen: Dispatch<React.SetStateAction<boolean>>;
    isSignupDialogOpen: boolean;
    setIsSignupDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {

    const [user, setUser] = React.useState<LoginResponse>(getUserDetails());

    const [isLoggedin, setIsLoggedin] = React.useState<boolean>(isAuthenticated());

    const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState<boolean>(false);

    const [isSignupDialogOpen, setIsSignupDialogOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setUser(getUserDetails());
        setIsLoggedin(isAuthenticated());
    }
    , [isLoggedin]);
    
    return (
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                isLoggedin,
                setIsLoggedin,
                isLoginDialogOpen,
                setIsLoginDialogOpen,
                isSignupDialogOpen,
                setIsSignupDialogOpen
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