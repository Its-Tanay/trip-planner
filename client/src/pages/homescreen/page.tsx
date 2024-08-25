import React from "react";
import { useAuthContext } from "../../lib/context/auth-context";
import UserPage from "./user-page/page";
import DisplayPage from "./display-page/page";

const HomescreenPage: React.FC = () => {

    const { isLoggedin } = useAuthContext();

    return (
        <>
            {isLoggedin ? <UserPage /> : <DisplayPage />}
        </>
    );
}

export default HomescreenPage;