"use client";

import { useItinerary } from "@/hooks";
import { ListOrdered } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useTransition } from "react";
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

  const [isPending, startTransition] = useTransition();

  const mapsRouteUrl = useMemo(() => {
    if (locals.length === 0) return undefined;
    return locals.reduce((acc, local) => {
      return `${acc}${local.latitude},${local.longitude}/`;
    }, `https://www.google.com/maps/dir//`);
  }, [locals]);

  const handleOptimizeItinerary = useCallback(() => {
    startTransition(() => {
      optimizeItinerary();
    });
  }, [optimizeItinerary, startTransition]);

  return (
    <section className="mb-8 py-8">
      <div className="container mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 lg:flex-row-reverse lg:justify-between">
        {count > 0 ? (
          <>
            <div className="flex-1">
              <ItineraryList locals={locals} onRemove={removeLocal} />
              <div className="flex flex-col items-center justify-center py-6">
                <button
                  onClick={handleOptimizeItinerary}
                  disabled={isPending}
                  className="mx-auto inline-flex items-center space-x-2 rounded-full border border-transparent bg-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                >
                  <ListOrdered className="h-6 w-6" />
                  <span>Buscar roteiro otimizado ({count} locais)</span>
                </button>
              </div>
            </div>
            <div className="flex-1">
              <ItineraryMap
                waypoints={waypoints}
                centerCoords={centerCoords}
                googleMapsUrl={mapsRouteUrl}
              />
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
