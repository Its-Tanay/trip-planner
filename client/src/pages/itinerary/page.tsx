import React from "react";
import { 
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger 
} from "../../components/ui/accordion";
import { mockData } from "./mock_data";
import { locationIcon } from "../../lib/assets";

const ItineraryPage : React.FC = () => {
    return (
        <div className="w-screen h-full px-8 pb-4 flex justify-center">
            <div className="h-full max-w-[758px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
                <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                    Here&apos;s you Trip Itinerary
                </h2>
                <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                    {/* <Accordion type="single" collapsible className="w-full flex flex-col gap-8">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-4xl">
                                <div className="flex items-center justify-start gap-8">
                                    <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                    2020-10-04
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-4xl">
                                <div className="flex items-center justify-start gap-8">
                                    <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                    2020-10-04
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-4xl">
                                <div className="flex items-center justify-start gap-8">
                                    <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                    2020-10-04
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> */}
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-8">
                        {Object.entries(mockData.itinerary).map(([date, items], index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-4xl">
                                <div className="flex items-center justify-start gap-8">
                                <img src={locationIcon} alt="Location Icon" className="w-8 h-8" />
                                {date}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* <div className="flex flex-col gap-4">
                                {items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="border p-4 rounded">
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    {item.image_url && (
                                        <img src={item.image_url} alt={item.name} className="w-full h-auto mt-2 rounded" />
                                    )}
                                    <p className="mt-2">{item.description}</p>
                                    <p className="mt-2"><strong>Start Time:</strong> {item.startTime}</p>
                                    <p><strong>End Time:</strong> {item.endTime}</p>
                                    <p><strong>Expense:</strong> ${item.expense}</p>
                                    </div>
                                ))}
                                </div> */}
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