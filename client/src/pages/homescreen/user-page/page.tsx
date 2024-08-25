import React from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import TripCard from "./trip-card";
import { UserItineraryItem } from "../../../interfaces/user-itineraries";
import { useGetAllItineraries } from "../../../lib/api/api-module";
import { useToast } from "../../../components/ui/toast/use-toast";

const UserPage : React.FC = () => {

    const { toast }= useToast();

    const successHandler = (data: UserItineraryItem[]) => {
        setUserItineraries(data);
    }

    const errorHandler = (error: any) => {
        toast({
            title: "Error",
            description: "Failed to fetch itineraries",
            variant: "destructive",
            duration: 5000,
        });
    }

    const getAllItinerariesMutation = useGetAllItineraries(successHandler, errorHandler);

    const [userItineraries, setUserItineraries] = React.useState<UserItineraryItem[]>([]);

    const [refreshTrigger, setRefreshTrigger] = React.useState(0);

    React.useEffect(() => {
        getAllItinerariesMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTrigger]);

    const triggerRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    }

    if(getAllItinerariesMutation.isPending) {
        return (
            <div className="w-screen h-full flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-t-[#03B55C] rounded-full animate-spin"></div>
            </div>
        );
    }

    return(
        <div className="w-screen h-full pb-4 flex justify-center px-8 py-4 md:px-24 md:py-8 lg:px-36 lg:py-8">
            <div className="h-full max-w-[1024] w-full flex flex-col gap-8 md:gap-12 lg:gap-10">
                <div className="flex justify-between w-full items-center">
                    <h2 className="scroll-m-20 pb-2 text-lg md:text-xl lg:text-2xl font-regular tracking-tight first:mt-0">
                        Your Trips
                    </h2>
                    <Link to="/create-trip">
                        <Button variant={'default'} className="border-2 border-[#03B55C]">
                            Create Trip
                        </Button>
                    </Link>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-10 pb-8">
                    {userItineraries?.map((itinerary, index) => (
                        <TripCard 
                            key={index} 
                            city={itinerary.city} 
                            start_date={itinerary.start_date} 
                            end_date={itinerary.end_date}
                            id={itinerary.id}
                            onDeleteSuccess={triggerRefresh}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserPage;