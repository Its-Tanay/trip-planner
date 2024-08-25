export interface ItineraryRes {
    itinerary:  ItineraryItem[][];
    total_expense: number;
    start_date: string;
    end_date: string;
}

export interface ItineraryItem {
    description: string;
    endTime: string;
    expense: number;
    latitude: number;
    longitude: number;
    name: string;
    startTime: string;
    type: string;
    activity_id?: number; 
    average_duration?: number; 
    average_price?: number; 
    budget_category?: number; 
    category_id?: number;
    city_id?: number; 
    close_time?: string;
    day_of_week?: number;
    food_option_id?: number;
    has_breakfast?: boolean;
    has_dinner?: boolean;
    has_lunch?: boolean;
    image_url?: string;
    is_vegetarian?: boolean;
    open_time?: string;
    popularity?: number; 
    wheelchair_accessibility?: boolean;
}