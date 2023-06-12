"use client";

import { useItinerary } from "@/hooks";
import { MapIcon } from "@heroicons/react/24/outline";
import L from "leaflet";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { CurrentLocationMarker } from "../CurrentLocationMarker";
import { FlyToButton } from '../FlyToButton';

export type ItineraryRoutingProps = {
  waypoints: L.Routing.Waypoint[];
  centerCoords?: L.LatLngExpression;
  googleMapsUrl?: string;
};

const ItineraryRouting = dynamic(() => import("./ItineraryRouting"), {
  ssr: false,
});

export const ItineraryMap: React.FC<ItineraryRoutingProps> = ({
  waypoints,
  centerCoords,
  googleMapsUrl,
}) => {
  const { currentLocation, setCurrentLocation } = useItinerary();
  const [route, setRoute] = useState<L.Routing.IRoute | undefined>(undefined);

  const formattedDistance = useMemo(() => {
    if (route?.summary === undefined) return "";
    const distanceInKm = (route.summary.totalDistance / 1000).toLocaleString(
      "pt-BR",
      { maximumFractionDigits: 2 }
    );
    return `${distanceInKm} km`;
  }, [route]);

  const formattedTime = useMemo(() => {
    if (route?.summary === undefined) return "";
    const hours = Math.floor(route.summary.totalTime / 3600);
    const minutes = Math.floor((route.summary.totalTime % 3600) / 60);
    const hoursString = hours > 0 ? `${hours}h` : "";
    const minutesString = minutes > 0 ? `${minutes}min` : "";
    return `${hoursString} ${minutesString}`;
  }, [route]);

  return (
    <div className="shadowmax--xl relative h-full w-full overflow-hidden rounded-xl">
      <MapContainer
        center={centerCoords}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: "600px" }}
      >
        <TileLayer
          url={process.env.NEXT_PUBLIC_TILE_LAYER_URL!}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {currentLocation && <FlyToButton coords={currentLocation} />}
        <CurrentLocationMarker onLocationFound={setCurrentLocation} flyTo />
        <ItineraryRouting
          waypoints={waypoints}
          currentLocation={currentLocation}
          onRouteFound={setRoute}
        />
      </MapContainer>
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-gray-800/90 p-4">
        <div className="flex flex-wrap justify-between gap-2">
          {route && route.summary && (
            <div className="">
              <p className="text-neutral-200">
                <span className="text-sm">Distância total estimada: </span>
                <span className="font-bold">{formattedDistance}</span>
              </p>
              <p className="text-neutral-200">
                <span className="text-sm">Tempo total estimado: </span>
                <span className="font-bold">{formattedTime}</span>
              </p>
            </div>
          )}

          {googleMapsUrl && (
            <Link
              href={googleMapsUrl}
              target="_blank"
              role="button"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              Ver itinerário no Google Maps
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;
