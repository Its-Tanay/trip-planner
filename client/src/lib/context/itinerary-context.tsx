import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    type ReactNode,
} from "react";
import { ItineraryReq, CurrentPage } from "../../interfaces/itinerary-req";

interface ItineraryContextType {
    itineraryReq: ItineraryReq;
    setItineraryReq: Dispatch<SetStateAction<ItineraryReq>>;
    currentPage: CurrentPage;
    setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryContextProviderProps {
    children: ReactNode;
}

export const ItineraryContextProvider = ({
    children,
}: ItineraryContextProviderProps): JSX.Element => {

    const [currentPage, setCurrentPage] = React.useState<CurrentPage>(CurrentPage.ACTIVITY);

    const [itineraryReq, setItineraryReq] = React.useState<ItineraryReq>({} as ItineraryReq);
    
    return (
        <ItineraryContext.Provider 
            value={{
                itineraryReq,
                setItineraryReq,
                currentPage,
                setCurrentPage
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
