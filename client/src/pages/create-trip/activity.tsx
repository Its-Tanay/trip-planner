import React from "react";
import { useItineraryContext } from "../../lib/context/itinerary-context";
import { AutoComplete, Option } from "../../components/ui/autocomplete";
import { Cities, Categories } from "../data";
import { DatePickerWithRange } from "../../components/ui/date-picker-range";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Slider } from "../../components/ui/slider";
import { Budget, CurrentPage } from "../../interfaces/itinerary-req";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/toast/use-toast";

const ActivityPage: React.FC = () => {

    const { setItineraryReq, itineraryReq, setCurrentPage } = useItineraryContext();

    const { toast } = useToast();

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
                budget: prevState.activityPreferences.budget,
            },
        }));
    };

    const handleBudgetChange = (value: number) => {
        let newBudget: Budget;

        if (value === 0) {
            newBudget = Budget.LOW;
        } else if (value === 50) {
            newBudget = Budget.MEDIUM;
        } else if (value === 100) {
            newBudget = Budget.HIGH;
        }

        setItineraryReq((prevState) => ({
            ...prevState,
            activityPreferences: {
                ...prevState.activityPreferences,
                budget: newBudget,
            },
        }));
    };

    const handleAccessibilityChange = (value: string) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            accessibility_need: value === "yes",
        }));
    };

    const validateFields = (): boolean => {
        const { city, duration, activityPreferences } = itineraryReq;
        return (
            city !== 0 &&
            duration.startDate !== "" &&
            duration.endDate !== "" &&
            (activityPreferences.categories?.length ?? 0) > 0 &&
            activityPreferences.budget !== undefined
        );
    };

    const handleNextClick = () => {
        if (validateFields()) {
            setCurrentPage(CurrentPage.FOOD);
        } else {
            toast({
                title: "Please fill all the fields",
                description: "All fields are mandatory",
                variant: "destructive",
            });
        }
    };

    const currentDateRange: DateRange | undefined =
        itineraryReq.duration?.startDate
            ? {
                  from: itineraryReq.duration.startDate ? new Date(itineraryReq.duration.startDate) : undefined,
                  to: itineraryReq.duration.endDate ? new Date(itineraryReq.duration.endDate) : undefined,
              }
            : undefined;

    return (
        <div className="h-full max-w-[576px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
            <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                Plan your next trip
            </h2>
            <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                <div className="w-full flex flex-col gap-4">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        Where do you want to go?
                    </h4>
                    <AutoComplete
                        placeholder="Enter a location"
                        options={Cities}
                        onValueChange={handleCityChange}
                        emptyMessage="No cities found"
                        value={Cities.find((city) => city.value === itineraryReq.city)}
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
                <div className="w-full flex flex-col gap-8">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        Budget level -
                    </h4>
                    <div className="w-full flex flex-wrap h-auto">
                        <Slider
                            step={50}
                            onValueChange={(value) => handleBudgetChange(value[0])}
                            defaultValue={[
                                itineraryReq.activityPreferences?.budget === Budget.LOW ? 0 : itineraryReq.activityPreferences?.budget === Budget.MEDIUM ? 50 : 100
                            ]}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row  md:items-center gap-8 mt-8">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight md:min-w-max ">
                        Wheelchair Accessibility Needed?
                    </h4>
                    <div className="w-full flex h-auto md:w-full">
                        <ToggleGroup 
                            className="w-full flex items-start justify-start gap-4" 
                            variant="outline" 
                            type="single"
                            value={itineraryReq.accessibility_need ? "yes" : "no"}
                            onValueChange={handleAccessibilityChange}
                        >
                            <ToggleGroupItem 
                                className="py-[8px] px-[10px] w-full" 
                                value="yes" 
                                aria-label="Toggle Yes"
                            >
                                Yes
                            </ToggleGroupItem>
                            <ToggleGroupItem 
                                className="py-[8px] px-[10px] w-full" 
                                value="no" 
                                aria-label="Toggle No"
                            >
                                No
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <Button variant={"default"} className="w-[20%] bg-secondary text-accent hover:bg-secondary/50" onClick={handleNextClick}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ActivityPage;