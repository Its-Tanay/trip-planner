import React from "react";
import { useItineraryContext } from "../../lib/context/itinerary-context";
import ActivityPage from "./activity";
import FoodPage from "./food";
import { CurrentPage } from "../../interfaces/itinerary-req";

const CreateTripPage : React.FC = () => {

    const { currentPage } = useItineraryContext();

    return(
        <div className="w-screen h-full px-8 pb-4 flex justify-center">
            {
                currentPage === CurrentPage.ACTIVITY ? <ActivityPage /> : <FoodPage />
            }
        </div>
    )
}

export default CreateTripPage;