"use client";

import { useItinerary } from "@/hooks";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ItineraryEmpty } from "./ItineraryEmpty";
import { ItineraryList } from "./ItineraryList";

const ItineraryMap = dynamic(() => import("./ItineraryMap"), {
  ssr: false,
});

export const Itinerary: React.FC = () => {
  const { locals, count, centerCoords, waypoints } = useItinerary();

  const mapsRouteUrl = useMemo(() => {
    if (locals.length === 0) return undefined;
    return locals.reduce((acc, local) => {
      return `${acc}${local.latitude},${local.longitude}/`;
    }, `https://www.google.com/maps/dir//`);
  }, [locals]);

  return (
    <section className="mb-8 py-8">
      <div className="container mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 lg:flex-row-reverse lg:justify-between">
        {count > 0 ? (
          <>
            <ItineraryList locals={locals} />
            <ItineraryMap
              waypoints={waypoints}
              centerCoords={centerCoords}
              googleMapsUrl={mapsRouteUrl}
            />
          </>
        ) : (
          <div className="w-full">
            <ItineraryEmpty />
          </div>
        )}
      </div>
    </section>
  );
};

export default Itinerary;
