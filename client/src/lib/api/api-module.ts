import apiClient from "./api-client";
import { useMutation } from "@tanstack/react-query";
import { ItineraryRes } from "@/interfaces/itinerary-res";
import { ItineraryReq } from "@/interfaces/itinerary-req";

interface MutateFunctionInterface<P, R> {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    mutate: (data: P) => void;
    data: R | undefined;
}

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
                url: "/itinerary",
                body: data,
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
        data: itineraryMutation.data,
    };
};