"use client";

import { useItinerary } from "@/hooks";
import { MapIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { ItineraryList } from "./ItineraryList";

const ItineraryMap = dynamic(() => import("./ItineraryMap"), {
  ssr: false,
});

export const Itinerary: React.FC = () => {
  const { locals, count, centerCoords, waypoints } = useItinerary();

  const mapsRouteUrl = useMemo(() => {
    return locals.reduce((acc, local) => {
      return `${acc}${local.latitude},${local.longitude}/`;
    }, `https://www.google.com/maps/dir//`);
  }, [locals]);

  return (
    <section className="mb-8 py-8">
      <div className="mx-auto max-w-lg">
        {count > 0 && (
          <>
            <ItineraryList locals={locals} />
            <div className="mt-4 flex justify-center">
              <Link
                href={mapsRouteUrl}
                target="_blank"
                role="button"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Ver itinerário no Google Maps
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ItineraryMap
          waypoints={waypoints}
          centerCoords={centerCoords}
          googleMapsUrl={mapsRouteUrl}
        />
      </div>
    </section>
  );
};

export default Itinerary;
