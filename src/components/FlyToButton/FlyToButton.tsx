import { LocateFixed } from "lucide-react";
import { useMap } from "react-leaflet";

export type FlyToButtonProps = {
  coords: L.LatLngExpression;
};

export const FlyToButton = ({ coords }: FlyToButtonProps) => {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(coords, map.getZoom());
  };

  return (
    <button
      className="absolute right-4 top-4 z-[1001] rounded-full bg-white p-3 shadow-md"
      onClick={handleClick}
    >
      <LocateFixed className="h-6 w-6 text-gray-600" />
      <span className="sr-only">Ir para a localização atual do usuário</span>
    </button>
  );
};
