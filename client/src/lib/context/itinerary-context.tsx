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

export const ItineraryContextProvider = ({
    children,
}: ItineraryContextProviderProps): JSX.Element => {

    const { toast } = useToast();

    const [currentPage, setCurrentPage] = React.useState<CurrentPage>(CurrentPage.ACTIVITY);

    const [itineraryReq, setItineraryReq] = React.useState<ItineraryReq>(defaultItineraryReq);

    const [itineraryRes, setItineraryRes] = React.useState<ItineraryRes>();

    const successHandler = (data: ItineraryRes) => {
        setItineraryRes(data);
    }

    const errorHandler = (error: any) => {
        if(error.response?.status === 401) {

        }
        toast({
            title: "Itinerary creation failed",
            description: error.message,
            variant: "destructive"
        });
    }

    const itineraryMutation = useCreateItinerary(successHandler, errorHandler);

    const byIdSuccessHandler = (data: ItineraryRes) => {
        setItineraryRes(data);
    }

    const byIdErrorHandler = (error: any) => {
        if(error.response?.status === 401) {
            
        }
        toast({
            title: "Itinerary fetch failed",
            description: error.message,
            variant: "destructive"
        });
    }

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

export const useItineraryContext = (): ItineraryContextType => {
    const context = useContext(ItineraryContext);
    if (context === undefined) {
        throw new Error(
            "useItineraryContext must be used within an ItineraryContextProvider"
        );
    }
    return context;
};
