import { ItineraryContext } from "@/contexts/itinerary.provider";
import { useContext } from "react";

export const useItinerary = () => {
  const ctx = useContext(ItineraryContext);

  if (ctx === null) {
    throw new Error("useItinerary must be used inside <ItineraryProvider />");
  }

  return { ...ctx };
};

export default useItinerary;
