import React from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SignupDialog from "../auth-dialogs/signup";
import LoginDialog from "../auth-dialogs/login";
import { removeUserDetails } from "../../lib/api/auth";
import { Button } from "../ui/button";
import { useAuthContext } from "../../lib/context/auth-context";
import { useItineraryContext, defaultItineraryReq } from "../../lib/context/itinerary-context";
import { CurrentPage } from "../../interfaces/itinerary-req";
import { LucideLogOut } from "lucide-react";

const Header: React.FC = () => {

    const { isLoggedin, setIsLoggedin, user } = useAuthContext();

    const { setCurrentPage, setItineraryReq } = useItineraryContext();

    const location = useLocation();
    const navigate = useNavigate();
    const isHomepage = location.pathname === "/";

    const handleBackClick = async () => {
        if (location.pathname === "/trip-itinerary") {
            await setCurrentPage(CurrentPage.ACTIVITY)
            setItineraryReq(defaultItineraryReq);
            navigate("/");
        } else {
            await setCurrentPage(CurrentPage.ACTIVITY)
            setItineraryReq(defaultItineraryReq);
            navigate(-1);
        }
    };

    const handleLogout = () => {
        removeUserDetails();
        setIsLoggedin(false);
        navigate("/");
    };

    return (
        <header className="w-screen flex flex-row items-center justify-between bg-transparent px-8 py-4 md:px-24 md:py-8 lg:px-36 lg:py-8">
            <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
                {!isHomepage && (
                    <ChevronLeft size={24} onClick={handleBackClick} className="cursor-pointer" />
                )}
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Trip Planner 
                </h3>
            </div>
            <nav className="w-fit flex items-center gap-4 lg:gap-8">
            {isLoggedin ? (
                    <div className="flex flex-col md:flex-row items-end md:items-center lg:gap-8">
                        <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 md:border-[1px] border-accent-foreground">
                            <span className="hidden md:inline">Logout</span><LucideLogOut size={16} />
                        </Button>
                        <p>
                            Welcome<span className="hidden md:inline">, {user.username}</span>
                        </p>
                    </div>
                ) : (
                    <>
                        <SignupDialog />
                        <LoginDialog />
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;