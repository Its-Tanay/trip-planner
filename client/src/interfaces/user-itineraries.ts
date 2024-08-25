export interface UserItineraries {
    data: UserItineraryItem[];
}

export interface UserItineraryItem {
    city: string;
    city_id: number;
    created_at: string;
    end_date: string;
    id: number;
    name: string;
    start_date: string;
    user_id: number;
}