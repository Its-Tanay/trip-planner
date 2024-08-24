import React from "react";
import { useItineraryContext } from "../../lib/context/itinerary-context";
import { Cuisines } from "../data";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Slider } from "../../components/ui/slider";
import { Budget, CurrentPage } from "../../interfaces/itinerary-req";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/index";

const FoodPage: React.FC = () => {
    const { setItineraryReq, itineraryReq, setCurrentPage, itineraryMutation } = useItineraryContext();
    const navigate = useNavigate();

    const handleCuisineChange = (cuisines: string[]) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            foodPreferences: {
                ...prevState.foodPreferences,
                cuisines: cuisines.map(Number) ?? [],
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
            foodPreferences: {
                ...prevState.foodPreferences,
                budget: newBudget,
            },
        }));
    };

    const handleVegChange = (value: string) => {
        setItineraryReq((prevState) => ({
            ...prevState,
            foodPreferences: {
                ...prevState.foodPreferences,
                isVeg: value === "yes",
            },
        }));
    };

    const validateFields = (): boolean => {
        const { foodPreferences } = itineraryReq;
        return (
            (foodPreferences.cuisines?.length ?? 0) > 0 &&
            foodPreferences.budget !== undefined &&
            foodPreferences.isVeg !== undefined
        );
    };

    const handleNextClick = async () => {
        if (validateFields()) {
            try {
                await itineraryMutation.mutateAsync(itineraryReq);
                navigate("/trip-itinerary");
            } catch (error) {
                console.error("Error creating itinerary:", error);
                alert("An error occurred while creating the itinerary. Please try again.");
            }
        } else {
            alert("Please fill in all the required fields.");
        }
    };

    const handleBackClick = () => {
        setCurrentPage(CurrentPage.ACTIVITY);
    };

    if (itineraryMutation.isPending) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <Loader />
            </div>
        );
    }

    return (
        <div className="h-full max-w-[576px] w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-10">
            <h2 className="scroll-m-20 pb-2 text-3xl font-regular tracking-tight first:mt-0">
                Let’s decide your food
            </h2>
            <div className="w-full h-full flex flex-col items-center gap-6 md:gap-10 lg:gap-10">
                <div className="w-full flex flex-col gap-4">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        What cuisines do you prefer?
                    </h4>
                    <ToggleGroup 
                        className="w-full flex flex-wrap items-start justify-start gap-4" 
                        variant="outline" 
                        type="multiple"
                        value={itineraryReq.foodPreferences?.cuisines?.map(String) ?? []}
                        onValueChange={handleCuisineChange}
                    >
                        {Cuisines.map((cuisine) => (
                            <ToggleGroupItem 
                                className="py-[8px] px-[10px]" 
                                key={cuisine.value} 
                                value={cuisine.value.toString()} 
                                aria-label={`Toggle ${cuisine.label}`}
                            >
                                {cuisine.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
                <div className="w-full flex flex-col gap-8">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight">
                        Food Budget -
                    </h4>
                    <div className="w-full flex flex-wrap h-auto">
                        <Slider
                            step={50}
                            onValueChange={(value) => handleBudgetChange(value[0])}
                            defaultValue={[
                                itineraryReq.foodPreferences?.budget === Budget.LOW ? 0 : itineraryReq.foodPreferences?.budget === Budget.MEDIUM ? 50 : 100
                            ]}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row  md:items-center gap-8 mt-8">
                    <h4 className="scroll-m-20 text-xl font-regular tracking-tight md:min-w-max ">
                        Veg or Not?
                    </h4>
                    <div className="w-full flex h-auto md:w-full">
                        <ToggleGroup 
                            className="w-full flex items-start justify-start gap-4" 
                            variant="outline" 
                            type="single"
                            value={itineraryReq.foodPreferences?.isVeg ? "yes" : "no"}
                            onValueChange={handleVegChange}
                        >
                            <ToggleGroupItem 
                                className="py-[8px] px-[10px] w-full data-[state=on]:bg-destructive data-[state=on]:border-[#D44F0C]" 
                                value="no" 
                                aria-label="Toggle Yes"
                            >
                                Non Vegetarian
                            </ToggleGroupItem>
                            <ToggleGroupItem 
                                className="py-[8px] px-[10px] w-full" 
                                value="yes" 
                                aria-label="Toggle No"
                            >
                                Vegetarian
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <Button variant={"default"} className="w-full bg-secondary text-accent hover:bg-secondary/50" onClick={handleNextClick}>
                        Create Trip
                    </Button>
                    <Button variant={"outline"} className="w-full text-secondary hover:bg-secondary/50" onClick={handleBackClick}>
                        Edit Activity Preferences
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FoodPage;