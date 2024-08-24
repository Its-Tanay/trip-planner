import React from "react";

export interface ActivityItemProps {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    expense: number;
    latitude: number;
    longitude: number;
    type: string;
}

const ActivityItem : React.FC = () => {
    return (
        <div>

        </div>
    )
}

export default ActivityItem;