import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

type CurrentLocationMarkerProps = {
  onLocationFound?: (currentLocation: L.LatLng) => void;
  flyTo?: boolean;
};

export function CurrentLocationMarker({
  onLocationFound,
  flyTo = false,
}: CurrentLocationMarkerProps) {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const icon = L.icon({
    iconUrl: "/img/user-pin.png",
    iconSize: [28, 28],
    iconAnchor: [14, 0],
  });

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      const currentLocation = e.latlng;
      const radius = e.accuracy;
      const circle = L.circle(currentLocation, radius);
      circle.addTo(map);

      setPosition(currentLocation);
      if (onLocationFound) onLocationFound(currentLocation);

      if (flyTo) {
        map.flyTo(currentLocation, map.getZoom());
      }
    });
  }, [flyTo, map, onLocationFound]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>Você está aqui!</Popup>
    </Marker>
  );
}
