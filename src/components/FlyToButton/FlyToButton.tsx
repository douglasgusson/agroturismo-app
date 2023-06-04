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
      <svg
        className="h-6 w-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
};
