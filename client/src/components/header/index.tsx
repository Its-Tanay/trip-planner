import React from "react";
import { Button } from "../ui/button";

const Header : React.FC = () => {
    return (
        <header className="w-screen flex flex-row items-center justify-between bg-transparent px-8 py-4 md:px-16 md:py-8 lg:px-24 lg:py-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Trip Planner 
            </h3>
            <nav className="w-fit flex items-center gap-8">
                <Button variant={"default"} >
                    Log In
                </Button>
            </nav>
        </header>
    )
}

export default Header;