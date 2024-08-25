import React from "react";
import { UserItineraryItem } from "../../../interfaces/user-itineraries";
import { Button } from "../../../components/ui/button";
import { placeHolder } from "../../../lib/assets";
import { CalendarIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";

const TripCard: React.FC<UserItineraryItem> = ({ city, start_date, end_date, id }) => {

    const calculateDays = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return (
        <div className="flex flex-col gap-2 w-full h-auto items-start">
            <div className="w-full h-auto aspect-square rounded-[12px]">
                <img src={`${placeHolder}${city?.split(" ").join("+")}`} alt="city" className="w-full h-full rounded-[12px]" />
            </div>
            <h3 className="scroll-m-20 text-xl font-normal tracking-tight px-4">
                {city}
            </h3>
            <div className="flex items-center justify-between w-full px-4">
                <div className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    <p className="text-[#9E9E9E]">
                        {calculateDays(start_date ?? "", end_date ?? "")} days
                    </p>
                </div>
                <Button variant={'link'} onClick={() => {}} className="p-0 h-fit"> 
                    <TrashIcon size={16} color="black" />
                </Button>
            </div>
        </div>
    );
}

export default TripCard;