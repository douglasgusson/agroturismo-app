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
  const {
    locals,
    count,
    centerCoords,
    waypoints,
    removeLocal,
    optimizeItinerary,
  } = useItinerary();

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
            <div className="flex-1">
              <ItineraryList locals={locals} onRemove={removeLocal} />
            </div>
            <div className="flex-1">
              <ItineraryMap
                waypoints={waypoints}
                centerCoords={centerCoords}
                googleMapsUrl={mapsRouteUrl}
              />
              <div className="flex justify-center py-2">
                <button
                  onClick={() => optimizeItinerary()}
                  className="mx-auto inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <span>Reordenar roteiro</span>
                </button>
              </div>
            </div>
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
