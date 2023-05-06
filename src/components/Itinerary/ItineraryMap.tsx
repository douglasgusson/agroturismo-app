import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { ItineraryRouting } from "./ItineraryRouting";

export type ItineraryRoutingProps = {
  waypoints: L.Routing.Waypoint[];
  centerCoords?: LatLngExpression;
};

export const ItineraryMap: React.FC<ItineraryRoutingProps> = ({
  waypoints,
  centerCoords,
}) => {
  return (
    <MapContainer
      center={centerCoords}
      zoom={12}
      style={{ height: "40vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ItineraryRouting waypoints={waypoints} />
    </MapContainer>
  );
};
