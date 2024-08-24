import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomepage = location.pathname === "/";

    const handleBackClick = () => {
        if (location.pathname === "/trip-itinerary") {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <header className="w-screen flex flex-row items-center justify-between bg-transparent px-8 py-4 md:px-16 md:py-8 lg:px-24 lg:py-8">
            <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
                {!isHomepage && (
                    <ChevronLeft size={24} onClick={handleBackClick} className="cursor-pointer" />
                )}
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Trip Planner 
                </h3>
            </div>
            <nav className="w-fit flex items-center gap-8">
                <Button variant={"default"} >
                    Log In
                </Button>
            </nav>
        </header>
    );
}

export default Header;