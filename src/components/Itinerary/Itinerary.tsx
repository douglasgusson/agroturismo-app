"use client";

import { useItinerary } from "@/hooks";
import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
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
    isProcessing,
    removeLocal,
    reorderLocals,
    optimizeItinerary,
  } = useItinerary();

  const mapsRouteUrl = useMemo(() => {
    if (locals.length === 0) return undefined;
    return locals.reduce((acc, local) => {
      return `${acc}${local.latitude},${local.longitude}/`;
    }, `https://www.google.com/maps/dir//`);
  }, [locals]);

  const handleOptimizeItinerary = useCallback(() => {
    if (isProcessing) return;
    optimizeItinerary();
  }, [isProcessing, optimizeItinerary]);

  return (
    <section className="mb-8 py-8">
      <div className="container relative mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 lg:flex-row-reverse lg:justify-between">
        {count > 0 ? (
          <>
            <div className="flex-1">
              <ItineraryList
                locals={locals}
                onOptimize={optimizeItinerary}
                onRemove={removeLocal}
                onReorder={reorderLocals}
              />
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

        {isProcessing && (
          <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-white bg-opacity-75">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-emerald-600"></div>
              <p className="text-lg font-semibold text-neutral-600">
                Otimizando roteiro...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Itinerary;
