"use client";

import { LocalAddedNotification } from "@/components/LocalAddedNotification";
import { API_URL, removeLocalFromItinerary, saveItinerary } from "@/lib";
import { Local } from "@/types";
import L from "leaflet";
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";

export type ItineraryContextType = {
  locals: Local[];
  count: number;
  centerCoords?: L.LatLngExpression;
  waypoints: L.Routing.Waypoint[];
  currentLocation: L.LatLng | null;
  addLocal: (local: Local) => void;
  removeLocal: (local: Local) => void;
  optimizeItinerary: () => void;
  isInItinerary: (local: Local) => boolean;
  setCurrentLocation: (currentLocation: L.LatLng) => void;
};

const defaultContext: ItineraryContextType = {
  locals: [],
  count: 0,
  centerCoords: [-20.332572, -41.129592],
  waypoints: [],
  currentLocation: null,
  addLocal: () => {},
  removeLocal: () => {},
  optimizeItinerary: () => {},
  isInItinerary: () => false,
  setCurrentLocation: () => {},
};

export const ItineraryContext =
  createContext<ItineraryContextType>(defaultContext);

export type ItineraryProviderProps = PropsWithChildren<{
  initialLocals?: Local[];
}>;

export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({
  initialLocals = [],
  children,
}) => {
  const [locals, setLocals] = useState<Local[]>(initialLocals);
  const [currentLocation, setCurrentLocation] = useState<L.LatLng | null>(null);

  const isInItinerary = useCallback(
    (local: Local) => locals.find((l) => l.id === local.id) !== undefined,
    [locals]
  );

  const updateItinerary = useCallback((locals: Local[], isReorder = false) => {
    const localsIds = locals.map(({ id }) => id);
    saveItinerary(localsIds, isReorder);
  }, []);

  const addLocal = (local: Local) => {
    if (isInItinerary(local)) {
      toast.error((t) => (
        <span>
          <b>{local.name}</b> já está no seu roteiro.
        </span>
      ));
      return;
    }

    updateItinerary([...locals, local]);
    setLocals((prev) => [...prev, local]);
    toast.custom((t) => <LocalAddedNotification toast={t} local={local} />);
  };

  const removeLocal = (local: Local) => {
    setLocals((prev) => prev.filter((l) => l.id !== local.id));
    removeLocalFromItinerary(local.id);
    toast.success(
      (t) => (
        <span>
          <b>{local.name}</b> removido do seu roteiro.
        </span>
      ),
      { icon: "🗑️" }
    );
  };

  const count = useMemo(() => locals.length, [locals]);

  const getWaypoints = useCallback(
    () =>
      locals.map((local) => ({
        name: local.name,
        latLng: L.latLng(local.latitude, local.longitude),
      })),
    [locals]
  );

  const waypoints = useMemo(() => getWaypoints(), [getWaypoints]);

  const optimizeItinerary = useCallback(async () => {
    if (locals.length === 0) return;

    const params = new URLSearchParams();
    locals.forEach(({ id }) => params.append("ids", id.toString()));

    if (currentLocation) {
      params.append("current_latitude", currentLocation.lat.toString());
      params.append("current_longitude", currentLocation.lng.toString());
    } else {
      const [firstLocal] = locals;
      params.append("current_latitude", firstLocal.latitude.toString());
      params.append("current_longitude", firstLocal.longitude.toString());
    }

    const res = await fetch(`${API_URL}/algorithms/tsp?${params}`, {
      method: "GET",
    });

    const data = (await res.json()) as Local[];
    setLocals(data);
    updateItinerary(data, true);
  }, [currentLocation, locals, updateItinerary]);

  return (
    <ItineraryContext.Provider
      value={{
        locals,
        count,
        waypoints,
        currentLocation,
        centerCoords: defaultContext.centerCoords,
        addLocal,
        removeLocal,
        optimizeItinerary,
        isInItinerary,
        setCurrentLocation,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export default ItineraryProvider;
