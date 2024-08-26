import React from "react";
import { UserItineraryItem } from "../../../interfaces/user-itineraries";
import { Button } from "../../../components/ui/button";
import { placeHolder } from "../../../lib/assets";
import { CalendarIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { useDeleteItinerary } from "../../../lib/api/api-module";
import { useToast } from "../../../components/ui/toast/use-toast";
import { useItineraryContext } from "../../../lib/context/itinerary-context";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";

const TripCard: React.FC<UserItineraryItem & { onDeleteSuccess: () => void }> = ({ city, start_date, end_date, id, onDeleteSuccess }) => {

    const navigate = useNavigate();

    const { getItineraryById } = useItineraryContext();

    const successHandler = () => {
        onDeleteSuccess();
    }

    const errorHandler = (error: any) => {
        toast({
            title: "Error",
            description: "Failed to delete itinerary",
            variant: "destructive",
            duration: 5000,
        });
    }

    const { toast } = useToast();

    const deleteItineraryMutation = useDeleteItinerary(id ?? 0, successHandler, errorHandler);

    const calculateDays = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const handleDelete = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        deleteItineraryMutation.mutate();
    }

    const handleClickonCard = async () => {
        try{
            await getItineraryById.mutateAsync({ id: id ?? 0 });
            navigate("/trip-itinerary");
        }
        catch(error){
            console.error("Error in getting itinerary by id", error);
        }
    }

    const renderCardContent = () => (
        <>
            <div className="w-full h-auto aspect-square rounded-[12px]" onClick={handleClickonCard}>
                <img src={`${placeHolder}${city?.split(" ").join("+")}`} alt="city" className="w-full h-full rounded-[12px]" />
            </div>
            <h3 className="scroll-m-20 text-xl font-normal tracking-tight px-4">
                {city} {id}
            </h3>
            <div className="flex items-center justify-between w-full px-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    <p className="text-[#9E9E9E]">
                        {calculateDays(start_date ?? "", end_date ?? "")} days
                    </p>
                </div>
                <Button variant={'link'} onClick={handleDelete} className="p-0 h-fit"> 
                    <TrashIcon size={16} color="black" />
                </Button>
            </div>
        </>
    )

    if (getItineraryById.isPending) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full h-auto items-start cursor-pointer relative">
            {renderCardContent()}
            {deleteItineraryMutation.isPending && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-75 backdrop-blur-sm flex items-center justify-center rounded-[12px]">
                    <div className="w-8 h-8 border-2 border-t-[#03B55C] rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}

export default TripCard;