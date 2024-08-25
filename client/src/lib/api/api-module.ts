import apiClient from "./api-client";
import { useMutation } from "@tanstack/react-query";
import { ItineraryRes } from "../../interfaces/itinerary-res";
import { ItineraryReq } from "../../interfaces/itinerary-req";
import { LoginRequest, LoginResponse } from "@/interfaces/auth";
import { UserItineraries } from "@/interfaces/user-itineraries";

export interface MutateFunctionInterface<P, R> {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    mutate: (data: P) => void;
    mutateAsync: (data: P) => Promise<R>;
    data: R | undefined;
}

export const useLogin = (
    onSuccessHandler?: (data: LoginResponse) => void,
    onErrorHandler?: (error: any) => void
): MutateFunctionInterface<LoginRequest, LoginResponse> => {
    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginRequest) => {
            const response = await apiClient<LoginResponse>({
                method: "POST",
                url: "/api/auth/login",
                body: data,
                requiresAuth: false,
            });
            return response;
        },
        onSuccess: (response) => {
            onSuccessHandler?.(response);
        },
        onError: (error) => {
            onErrorHandler?.(error);
        },
    });
    return {
        isPending: loginMutation.isPending,
        isError: loginMutation.isError,
        isSuccess: loginMutation.isSuccess,
        mutate: loginMutation.mutate,
        mutateAsync: loginMutation.mutateAsync,
        data: loginMutation.data,
    };
};

export const useSignup = (
    onSuccessHandler?: (data: LoginResponse) => void,
    onErrorHandler?: (error: any) => void
): MutateFunctionInterface<LoginRequest, LoginResponse> => {
    const loginMutation = useMutation({
        mutationKey: ["signup"],
        mutationFn: async (data: LoginRequest) => {
            const response = await apiClient<LoginResponse>({
                method: "POST",
                url: "/api/auth/signup",
                body: data,
                requiresAuth: false,
            });
            return response;
        },
        onSuccess: (response) => {
            onSuccessHandler?.(response);
        },
        onError: (error) => {
            onErrorHandler?.(error);
        },
    });
    return {
        isPending: loginMutation.isPending,
        isError: loginMutation.isError,
        isSuccess: loginMutation.isSuccess,
        mutate: loginMutation.mutate,
        mutateAsync: loginMutation.mutateAsync,
        data: loginMutation.data,
    };
};

export const useCreateItinerary = (
    onSuccessHandler?: (data: ItineraryRes) => void,
    onErrorHandler?: (error: any) => void,
    onSettledHandler?: () => void
): MutateFunctionInterface<ItineraryReq, ItineraryRes> => {
    const itineraryMutation = useMutation({
        mutationKey: ["createItinerary"],
        mutationFn: async (data: ItineraryReq) => {
            const response = await apiClient<ItineraryRes>({
                method: "POST",
                url: "/api/generate",
                body: data,
                requiresAuth: true,
            });
            return response;
        },
        onSuccess: (response) => {
            onSuccessHandler?.(response);
        },
        onError: (error) => {
            onErrorHandler?.(error);
        },
        onSettled: () => {
            onSettledHandler?.();
        },
    });
    return {
        isPending: itineraryMutation.isPending,
        isError: itineraryMutation.isError,
        isSuccess: itineraryMutation.isSuccess,
        mutate: itineraryMutation.mutate,
        mutateAsync: itineraryMutation.mutateAsync,
        data: itineraryMutation.data,
    };
};

export const useGetAllItineraries = (
    onSuccessHandler?: (data: UserItineraries) => void,
    onErrorHandler?: (error: any) => void
): MutateFunctionInterface<void, UserItineraries> => {
    const itineraryMutation = useMutation({
        mutationKey: ["getAllItineraries"],
        mutationFn: async () => {
            const response = await apiClient<UserItineraries>({
                method: "GET",
                url: "/api/get",
                requiresAuth: true,
            });
            return response;
        },
        onSuccess: (response) => {
            onSuccessHandler?.(response);
        },
        onError: (error) => {
            onErrorHandler?.(error);
        },
    });
    return {
        isPending: itineraryMutation.isPending,
        isError: itineraryMutation.isError,
        isSuccess: itineraryMutation.isSuccess,
        mutate: itineraryMutation.mutate,
        mutateAsync: itineraryMutation.mutateAsync,
        data: itineraryMutation.data,
    };
}