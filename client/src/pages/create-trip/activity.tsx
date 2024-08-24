import React, { useEffect } from "react";
import { useItineraryContext } from "../../lib/context/itinerary-context";
import { AutoComplete, Option } from "../../components/ui/autocomplete";
import { Cities, Categories } from "../data";
import { DatePickerWithRange } from "../../components/ui/date-picker-range";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

const ActivityPage: React.FC = () => {
    const { setItineraryReq, itineraryReq } = useItineraryContext();

    const handleCityChange = (option: Option) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            city: option.value,
        }));
    };

    const handleDateChange = (newDate: DateRange | undefined) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            duration: {
                startDate: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : undefined,
                endDate: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : undefined,
            },
        }));
    };

    const handleCategoryChange = (categories: string[]) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            activityPreferences: {
                categories: categories.map(Number) ?? [],
            },
        }));
    };

    const currentDateRange: DateRange | undefined = 
        itineraryReq.duration?.startDate
            ? {
                from: itineraryReq.duration.startDate ? new Date(itineraryReq.duration.startDate) : undefined,
                to: itineraryReq.duration.endDate ? new Date(itineraryReq.duration.endDate) : undefined,
              }
            : undefined;

    useEffect(() => {
        console.log(itineraryReq);
    }, [itineraryReq]);

    return (
        <div className="h-full max-w-[576px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-16">
            <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                Plan your next trip
            </h2>
            <div className="w-full h-full flex flex-col gap-8 md:gap-10 lg:gap-14">
                <div className="w-full flex flex-col gap-4">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        Where do you want to go?
                    </h4>
                    <AutoComplete
                        placeholder="Enter a location"
                        options={Cities}
                        onValueChange={handleCityChange}
                        emptyMessage="No cities found"
                    />
                    <DatePickerWithRange
                        date={currentDateRange}
                        onDateChange={handleDateChange}
                        numberOfMonths={1}
                    />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        Select the kind of activities you want to do -
                    </h4>
                    <div className="w-full flex flex-wrap h-auto">
                        <ToggleGroup 
                            className="w-full flex flex-wrap items-start justify-start gap-4" 
                            variant="outline" 
                            type="multiple"
                            value={itineraryReq.activityPreferences?.categories?.map(String) ?? []}
                            onValueChange={handleCategoryChange}
                        >
                            {Categories.map((category) => (
                                <ToggleGroupItem 
                                    className="py-[8px] px-[10px]" 
                                    key={category.value} 
                                    value={category.value.toString()} 
                                    aria-label={`Toggle ${category.label}`}
                                >
                                    {category.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;