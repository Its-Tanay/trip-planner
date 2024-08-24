import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    type ReactNode,
} from "react";
import { ItineraryReq, CurrentPage } from "../../interfaces/itinerary-req";
import { useCreateItinerary } from "../api/api-module";
import { ItineraryRes } from "@/interfaces/itinerary-res";

interface ItineraryContextType {
    itineraryReq: ItineraryReq;
    setItineraryReq: Dispatch<SetStateAction<ItineraryReq>>;
    currentPage: CurrentPage;
    setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
    itineraryMutation: any;
    itineraryRes: ItineraryRes | undefined;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryContextProviderProps {
    children: ReactNode;
}

export const ItineraryContextProvider = ({
    children,
}: ItineraryContextProviderProps): JSX.Element => {

    const [currentPage, setCurrentPage] = React.useState<CurrentPage>(CurrentPage.ACTIVITY);

    const [itineraryReq, setItineraryReq] = React.useState<ItineraryReq>({
        city: 0,
        accessibility_need: false,
        activityPreferences: {
            categories: [],
            budget: 1
        },
        foodPreferences: {
            cuisines: [],
            budget: 1,
            isVeg: false
        },
        duration: {
            startDate: "",
            endDate: ""
        }
    });

    const [itineraryRes, setItineraryRes] = React.useState<ItineraryRes>();

    const successHandler = (data: ItineraryRes) => {
        setItineraryRes(data);
    }

    const errorHandler = (error: any) => {
        console.error(error);
    }

    const itineraryMutation = useCreateItinerary(successHandler, errorHandler);
    
    return (
        <ItineraryContext.Provider 
            value={{
                itineraryReq,
                setItineraryReq,
                currentPage,
                setCurrentPage,
                itineraryMutation,
                itineraryRes
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
