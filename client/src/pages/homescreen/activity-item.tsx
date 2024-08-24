import React from "react";
import { placeHolder, arrowIcon } from "../../lib/assets";

export interface ActivityItemProps {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    expense: number;
    latitude: number;
    longitude: number;
    type: string;
    image_url: string;
}

const ActivityItem : React.FC<ActivityItemProps> = ({name, description, startTime, endTime, expense, latitude, longitude, type, image_url}) => {
    return (
        <div className="w-full h-fit bg-[#FAFAFA] border-[#EEEEEE] border-[2px] rounded-[12px] flex flex-col md:flex-row gap-4 p-[12px]">
            <div className="w-[20%]">
                <img src={`${placeHolder}${name.split(" ").join("+")}`} alt={name} className="w-full h-auto rounded-[12px]" />
            </div>
            <div className="w-full h-full flex flex-col items-start gap-[6px]">
                <h4 className="w-full scroll-m-20 text-xl font-regular tracking-tight">
                    {name} 
                </h4>
                <p className="leading-7 text-[#9E9E9E]">
                    {description}
                </p>
                <div className="w-full flex justify-start items-center gap-4">
                    <div className="w-fit flex items-center py-[5px] px-[10px] gap-[4px] rounded-lg bg-white border-[#EEEEEE] border-[1px]">
                        <p className="text-accent-foreground">
                            {startTime}
                        </p>
                        <img src={arrowIcon} alt="Arrow Icon" className="w-[10px] h-[12px]" />
                        <p className="text-accent-foreground">
                            {endTime}
                        </p>
                    </div>
                    <div className="w-[6px] h-[6px] rounded-[50%] bg-black "></div>
                    <p className="font-semibold">
                        Rs. {expense}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ActivityItem;