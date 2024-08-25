import { LoginResponse } from "@/interfaces/auth";

const USER_DETAILS = 'user_details';

export const setUserDetails = (userDetails : LoginResponse) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));
}

export const getUserDetails = () => {
    let userDetails = localStorage.getItem(USER_DETAILS);
    if(userDetails){
        return JSON.parse(userDetails);
    };
}

export const getAccessToken = () => {
    let userDetails = getUserDetails();
    if(userDetails){
        return userDetails.access_token;
    }
}

export const removeUserDetails = () => {
    localStorage.removeItem(USER_DETAILS);
}

export const isAuthenticated = () => {
    return !!getUserDetails();
}