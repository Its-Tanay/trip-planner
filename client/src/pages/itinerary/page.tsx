import React from "react";
import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger 
} from "../../components/ui/accordion";
import { locationIcon } from "../../lib/assets";
import ActivityItem from "./activity-item";
import { useItineraryContext } from "../../lib/context/itinerary-context";
import { format } from "date-fns";
import { ItineraryItem } from "../../interfaces/itinerary-res";

const ItineraryPage: React.FC = () => {
    const { itineraryRes } = useItineraryContext();

    const handleDates = (startDate: string, endDate: string): string[] => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const dates = [];
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }

        return dates.map((date) => format(date, "dd MMM yyyy, EEEE"));
    }

    if (!itineraryRes) {
        return (
            <div className="w-full h-full flex items-center justify-center transform translate-y-[-5%]">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Sorry! No Itinerary Found
                </h2>
            </div>
        )
    }

    const allDates = handleDates(itineraryRes.start_date, itineraryRes.end_date);

    return (
        <div className="w-screen h-full px-8 flex justify-center">
            <div className="h-full max-w-[758px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Here&apos;s your Trip Itinerary
                </h2>
                <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-8 pb-8">
                        {itineraryRes.itinerary.map((dayItems: ItineraryItem[], index: number) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-xl md:text-xl lg:text-2xl">
                                    <div className="flex items-center justify-start gap-8">
                                        <img src={locationIcon} alt={`Location Icon for day ${index + 1}`} className="w-8 h-8" />
                                        {allDates[index]}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-8 pt-8">
                                    {dayItems.map((activity: ItineraryItem, activityIndex: number) => (
                                        <ActivityItem 
                                            key={activityIndex} 
                                            name={activity.name} 
                                            description={activity.description} 
                                            startTime={activity.startTime} 
                                            endTime={activity.endTime} 
                                            expense={activity.expense} 
                                            latitude={activity.latitude} 
                                            longitude={activity.longitude} 
                                            type={activity.type} 
                                            image_url={activity.image_url ?? ""}
                                        />
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage;