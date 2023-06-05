"use client";

import { useItinerary } from "@/hooks";
import { ListOrdered } from "lucide-react";
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
                onRemove={removeLocal}
                onReorder={reorderLocals}
              />
              <div className="flex flex-col items-center justify-center py-6">
                <button
                  onClick={handleOptimizeItinerary}
                  disabled={isProcessing}
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

        {isProcessing && (
          <div className="absolute inset-0 flex z-[1001] items-center justify-center bg-white bg-opacity-75">
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
