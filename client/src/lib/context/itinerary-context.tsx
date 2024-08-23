import React, {
    createContext,
    useContext,
    type ReactNode,
} from "react";

interface ItineraryContextType {
    itinerary: string[]; 
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryContextProviderProps {
    children: ReactNode;
}

export const ItineraryContextProvider = ({
    children,
}: ItineraryContextProviderProps): JSX.Element => {
    
    return (
        <ItineraryContext.Provider 
            value={{
                itinerary: []
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
