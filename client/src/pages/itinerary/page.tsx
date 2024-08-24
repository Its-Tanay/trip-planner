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

const ItineraryPage: React.FC = () => {

    const { itineraryRes } = useItineraryContext();

    if (!itineraryRes) {
        return (
            <div className="w-full h-full flex items-center justify-center transform translate-y-[-5%]">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Sorry! No Itinerary Found
                </h2>
            </div>
        )
    }

    return (
        <div className="w-screen h-full px-8 flex justify-center">
            <div className="h-full max-w-[758px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Here&apos;s your Trip Itinerary
                </h2>
                <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-8 pb-8">
                        {Object.entries(itineraryRes?.itinerary ?? {}).map(([date, items], index) => {
                            const formattedDate = format(new Date(date), "dd MMM yyyy, EEEE");

                            return (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl">
                                        <div className="flex items-center justify-start gap-8">
                                            <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                            {formattedDate}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-8 pt-8">
                                        {items.map((item, itemIndex) => (
                                            <ActivityItem 
                                                key={itemIndex} 
                                                name={item.name} 
                                                description={item.description} 
                                                startTime={item.startTime} 
                                                endTime={item.endTime} 
                                                expense={item.expense} 
                                                latitude={item.latitude} 
                                                longitude={item.longitude} 
                                                type={item.type} 
                                                image_url={item.image_url ?? ""}
                                            />
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default ItineraryPage;