"use client";

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export type ItineraryRoutingProps = {
  waypoints: L.Routing.Waypoint[];
  onRouteFound?: (e: L.Routing.IRoute) => void;
};

export const ItineraryRouting: React.FC<ItineraryRoutingProps> = ({
  waypoints,
  onRouteFound,
}) => {
  const map = useMap();

  useEffect(() => {
    if (waypoints.length === 0) return;

    const routingControlOptions: L.Routing.RoutingControlOptions = {
      waypoints,
      lineOptions: {
        styles: [{ color: "#ff6584", opacity: 0.9, weight: 6 }],
        missingRouteTolerance: 10,
        extendToWaypoints: false,
        addWaypoints: false,
      },
      addWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      routeWhileDragging: false,
      plan: L.Routing.plan(waypoints, {
        createMarker: (index, waypoint) => {
          return L.marker(waypoint.latLng, {
            draggable: false,
            icon: L.divIcon({
              className:
                "bg-rose-600 text-white rounded-full p-3 flex items-center justify-center font-extrabold relative z-10",
              html: `<span class="absolute rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">${
                index + 1
              }</span>`,
            }),
          });
        },
      }),
    };

    const routingControl = L.Routing.control(routingControlOptions).addTo(map);

    routingControl.hide();

    routingControl.on("routesfound", (e: L.Routing.RoutingResultEvent) => {
      const routes = e.routes;
      const primaryRoute = routes[0];
      if (primaryRoute === undefined) return;
      onRouteFound && onRouteFound(primaryRoute);
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};

export default ItineraryRouting;
