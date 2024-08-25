import React from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import TripCard from "./trip-card";

const UserPage : React.FC = () => {

    return(
        <div className="w-screen h-full pb-4 flex justify-center px-8 py-4 md:px-24 md:py-8 lg:px-36 lg:py-8">
            <div className="h-full max-w-[1024] w-full flex flex-col gap-8 md:gap-12 lg:gap-10">
                <div className="flex justify-between w-full items-center">
                    <h2 className="scroll-m-20 pb-2 text-lg md:text-xl lg:text-2xl font-regular tracking-tight first:mt-0">
                        Your Trips
                    </h2>
                    <Link to="/create-trip">
                        <Button variant={'default'} className="border-2 border-[#03B55C]">
                            Create Trip
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-10">
                    <TripCard city={"Paris"} start_date={"2022-10-10"} end_date={"2022-10-20"} id={1} />
                    <TripCard city={"London"} start_date={"2022-11-10"} end_date={"2022-11-20"} id={2} />
                    <TripCard city={"New York"} start_date={"2022-12-10"} end_date={"2022-12-20"} id={3} />
                </div>
            </div>
        </div>
    )
}

export default UserPage;