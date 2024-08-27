import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    type ReactNode,
} from "react";
import { ItineraryReq, CurrentPage, Budget } from "../../interfaces/itinerary-req";
import { MutateFunctionInterface, useCreateItinerary } from "../api/api-module";
import { ItineraryRes } from "../../interfaces/itinerary-res";
import { useToast } from "../../components/ui/toast/use-toast";
import { useGetItineraryById } from "../api/api-module";

// Define the shape of the itinerary context
interface ItineraryContextType {
    itineraryReq: ItineraryReq;
    setItineraryReq: Dispatch<SetStateAction<ItineraryReq>>;
    currentPage: CurrentPage;
    setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
    itineraryRes: ItineraryRes | undefined;
    itineraryMutation: MutateFunctionInterface<ItineraryReq, ItineraryRes>;
    getItineraryById: MutateFunctionInterface<{id : number}, ItineraryRes>;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryContextProviderProps {
    children: ReactNode;
}

// Default itinerary request
export const defaultItineraryReq: ItineraryReq = {
    city: 0,
    accessibility_need: false,
    activityPreferences: {
        categories: [],
        budget: Budget.LOW
    },
    foodPreferences: {
        cuisines: [],
        budget: Budget.LOW,
        isVeg: false
    },
    duration: {
        startDate: "",
        endDate: ""
    }
};

/**
 * ItineraryContextProvider: Manages itinerary state and provides itinerary-related functionality
 */
export const ItineraryContextProvider = ({
    children,
}: ItineraryContextProviderProps): JSX.Element => {

    const { toast } = useToast();

    // State for current page and itinerary request/response
    const [currentPage, setCurrentPage] = React.useState<CurrentPage>(CurrentPage.ACTIVITY);

    const [itineraryReq, setItineraryReq] = React.useState<ItineraryReq>(defaultItineraryReq);

    const [itineraryRes, setItineraryRes] = React.useState<ItineraryRes>();

    // Handle successful itinerary creation
    const successHandler = (data: ItineraryRes) => {
        setItineraryRes(data);
    }

    // Handle itinerary creation errors
    const errorHandler = (error: any) => {
        if(error.response?.status === 401) {
            // Handle unauthorized access
        }
        toast({
            title: "Itinerary creation failed",
            description: error.message,
            variant: "destructive"
        });
    }

    // Use the create itinerary mutation
    const itineraryMutation = useCreateItinerary(successHandler, errorHandler);

    // Handle successful itinerary fetch by ID
    const byIdSuccessHandler = (data: ItineraryRes) => {
        setItineraryRes(data);
    }

    // Handle errors when fetching itinerary by ID
    const byIdErrorHandler = (error: any) => {
        if(error.response?.status === 401) {
            // Handle unauthorized access
        }
        toast({
            title: "Itinerary fetch failed",
            description: error.message,
            variant: "destructive"
        });
    }

    // Use the get itinerary by ID mutation
    const getItineraryById = useGetItineraryById(byIdSuccessHandler, byIdErrorHandler);
    
    return (
        <ItineraryContext.Provider 
            value={{
                itineraryReq,
                setItineraryReq,
                currentPage,
                setCurrentPage,
                itineraryMutation,
                itineraryRes,
                getItineraryById
            }}
        >
            {children}
        </ItineraryContext.Provider>
    );
};

/**
 * Hook to use the ItineraryContext
 */
export const useItineraryContext = (): ItineraryContextType => {
    const context = useContext(ItineraryContext);
    if (context === undefined) {
        throw new Error(
            "useItineraryContext must be used within an ItineraryContextProvider"
        );
    }
    return context;
};
