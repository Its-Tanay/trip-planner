export interface ItineraryReq {
    city: number;
    accessibility_need: boolean;
    activityPreferences: ActivityPreferences;
    foodPreferences: FoodPreferences;
    duration: Duration;
}

export interface ActivityPreferences {
    categories: number[];
    budget: Budget;
}

export interface FoodPreferences {
    cuisines: number[];
    budget: number;
    isVeg: boolean;
}

export interface Duration {
    startDate: Date;
    endDate: Date;
}

export enum Budget {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

export enum CurrentPage {
    ACTIVITY = 1,
    FOOD = 2
}