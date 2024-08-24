export interface ItineraryRes {
    itinerary: {
        [key: string]: ItineraryItem[];
    };
    total_expense: number;
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
    image_url?: string;
}