import React from "react";
import { Button } from "../../components/ui/button";
import { homescreenArt, homescreenButtonIcon } from "../../lib/assets";
import { Link } from "react-router-dom";

const HomescreenPage : React.FC = () => {
    return (
        <div className="w-screen h-full flex flex-col items-center px-8 pb-4 gap-8 md:px-16 md:pb-8 md:gap-12 lg:px-24 lg:pb-8 lg:gap-16">
            <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-8xl text-[#475B63] text-center ">
               {" Let’s Plan Your Next Trip"}
            </h1>
            <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-[#475B63] text-center">
                {"Build personalised itineraries with our Application."}
            </h4>
            <Link to="/create-trip">
                <Button variant={"default"} className=" bg-[#20FC8F] text-[#000000] flex items-center gap-2">
                    <img src={homescreenButtonIcon} alt="Homescreen Button Icon" className="w-[20px] h-[20px]" />
                    Create A New Trip
                </Button>
            </Link>
            <img src={homescreenArt} alt="Homescreen Art" className="w-[322px] lg:h-auto" />
        </div>
    )
}

export default HomescreenPage;