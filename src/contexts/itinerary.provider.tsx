"use client";

import { LocalAddedNotification } from "@/components/LocalAddedNotification";
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
  addLocal: (local: Local) => void;
  removeLocal: (local: Local) => void;
};

const defaultContext: ItineraryContextType = {
  locals: [],
  count: 0,
  centerCoords: [-20.332572, -41.129592],
  waypoints: [],
  addLocal: () => {},
  removeLocal: () => {},
};

export const ItineraryContext =
  createContext<ItineraryContextType>(defaultContext);

export const ItineraryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [locals, setLocals] = useState<Local[]>([]);

  const addLocal = (local: Local) => {
    if (locals.find((l) => l.id === local.id)) {
      toast.error((t) => (
        <span>
          <b>{local.name}</b> já está no seu roteiro.
        </span>
      ));
      return;
    }
    setLocals((prev) => [...prev, local]);
    toast.custom((t) => <LocalAddedNotification toast={t} local={local} />);
  };

  const removeLocal = (local: Local) => {
    setLocals((prev) => prev.filter((l) => l.id !== local.id));
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

  return (
    <ItineraryContext.Provider
      value={{
        locals,
        count,
        waypoints,
        centerCoords: defaultContext.centerCoords,
        addLocal,
        removeLocal,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export default ItineraryProvider;
