import React from "react";
import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger 
} from "../../components/ui/accordion";
import { locationIcon } from "../../lib/assets";
import ActivityItem from "../homescreen/activity-item";
import { useItineraryContext } from "../../lib/context/itinerary-context";

const ItineraryPage : React.FC = () => {

    const { itineraryRes } = useItineraryContext();

    return (
        <div className="w-screen h-full px-8 flex justify-center">
            <div className="h-full max-w-[758px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Here&apos;s you Trip Itinerary
                </h2>
                <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-8 pb-8">
                        {Object.entries(itineraryRes?.itinerary ?? {}).map(([date, items], index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-xl md:text-3xl lg:text-4xl">
                                <div className="flex items-center justify-start gap-8">
                                <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                {date}
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
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default ItineraryPage;