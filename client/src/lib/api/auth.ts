import { LoginResponse } from "@/interfaces/auth";

// Key used for storing user details in localStorage
const USER_DETAILS = 'user_details';

/**
 * Stores the user details in localStorage.
 * @param userDetails - The user's login response data
 */
export const setUserDetails = (userDetails: LoginResponse) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));
}

/**
 * Retrieves the user details from localStorage.
 * @returns The parsed user details or undefined if not found
 */
export const getUserDetails = () => {
    let userDetails = localStorage.getItem(USER_DETAILS);
    if (userDetails) {
        return JSON.parse(userDetails);
    }
}

/**
 * Retrieves the access token from the stored user details.
 * @returns The access token or undefined if not found
 */
export const getAccessToken = () => {
    let userDetails = getUserDetails();
    if (userDetails) {
        return userDetails.access_token;
    }
}

/**
 * Removes the user details from localStorage.
 */
export const removeUserDetails = () => {
    localStorage.removeItem(USER_DETAILS);
}

/**
 * Checks if the user is authenticated.
 * @returns true if user details exist in localStorage, false otherwise
 */
export const isAuthenticated = () => {
    return !!getUserDetails();
}