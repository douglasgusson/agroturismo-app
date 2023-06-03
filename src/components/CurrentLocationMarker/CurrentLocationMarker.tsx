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

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);

      setPosition(e.latlng);
      if (onLocationFound) onLocationFound(e.latlng);
      
      if (flyTo) {
        map.flyTo(e.latlng, map.getZoom());
      }
    });
  }, [flyTo, map, onLocationFound]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Você está aqui!</Popup>
    </Marker>
  );
}
