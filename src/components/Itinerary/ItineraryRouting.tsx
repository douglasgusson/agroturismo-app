import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export type ItineraryRoutingProps = {
  waypoints: L.Routing.Waypoint[];
};

export const ItineraryRouting: React.FC<ItineraryRoutingProps> = ({
  waypoints,
}) => {
  const map = useMap();

  useEffect(() => {
    if (waypoints.length === 0) return;

    const routingControlOptions: L.Routing.RoutingControlOptions = {
      waypoints,
      lineOptions: {
        styles: [{ color: "#ff6584", opacity: 0.9, weight: 5 }],
        missingRouteTolerance: 10,
        extendToWaypoints: false,
        addWaypoints: false,
      },
      addWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      routeWhileDragging: false,
    };

    const routingControl = L.Routing.control(routingControlOptions).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};
