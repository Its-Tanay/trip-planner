import React, {
    createContext,
    useContext,
    Dispatch,
    type ReactNode,
} from "react";
import { LoginRequest, LoginResponse } from "../../interfaces/auth";
import { isAuthenticated, getUserDetails, setUserDetails } from "../api/auth";
import { useLogin } from "../../lib/api/api-module";
import { useToast } from "../../components/ui/toast/use-toast";

export interface AuthContextType {
    user : LoginResponse;
    setUser: Dispatch<React.SetStateAction<LoginResponse>>;
    isLoggedin: boolean;
    setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
    isLoginDialogOpen: boolean;
    setIsLoginDialogOpen: Dispatch<React.SetStateAction<boolean>>;
    isSignupDialogOpen: boolean;
    setIsSignupDialogOpen: Dispatch<React.SetStateAction<boolean>>;
    loginMutation: any;
    formData: LoginRequest;
    setFormData: Dispatch<React.SetStateAction<LoginRequest>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {

    const { toast } = useToast();

    const [formData, setFormData] = React.useState({ 
        username: "", 
        password: "" 
    } as LoginRequest);

    const errorHandler = (error: any) => {
        toast({
            title: "Login failed",
            description: error.message,
            variant : "destructive"
        });
    };

    const successHandler = (data: LoginResponse) => {
        setUserDetails(data);
        setUser(data);
        setIsLoggedin(true);
        setIsLoginDialogOpen(false);
        toast({
            title: "Login successful",
            description: "You have been logged in",
            variant: "default"
        });
    };

    const loginMutation = useLogin(successHandler, errorHandler);

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
                setIsSignupDialogOpen,
                loginMutation,
                formData,
                setFormData,
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