"use client";

import L from "leaflet";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer } from "react-leaflet";

export type ItineraryRoutingProps = {
  waypoints: L.Routing.Waypoint[];
  centerCoords?: L.LatLngExpression;
};

const ItineraryRouting = dynamic(() => import("./ItineraryRouting"), {
  ssr: false,
});

export const ItineraryMap: React.FC<ItineraryRoutingProps> = ({
  waypoints,
  centerCoords,
}) => {
  return (
    <MapContainer
      center={centerCoords}
      zoom={12}
      style={{ height: "50vh", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ItineraryRouting waypoints={waypoints} />
    </MapContainer>
  );
};

export default ItineraryMap;
