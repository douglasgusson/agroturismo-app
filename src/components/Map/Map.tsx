"use client";

import { useItinerary } from "@/hooks";
import { Local } from "@/types";
import L from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AddToIninerary } from "../AddToIninerary/AddToIninerary";
import { CurrentLocationMarker } from "../CurrentLocationMarker";
import { FlyToButton } from "../FlyToButton";

export type MapProps = {
  locals: Local[];
};

const getIcon = () => {
  const icon = L.icon({
    iconUrl: "/img/pin.png",
    iconSize: [28, 28],
    iconAnchor: [14, 0],
  });

  return icon;
};

export const Map: FC<MapProps> = ({ locals }) => {
  const { centerCoords, currentLocation } = useItinerary();

  return (
    <MapContainer
      center={centerCoords}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={process.env.NEXT_PUBLIC_TILE_LAYER_URL!}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <CurrentLocationMarker />
      {currentLocation && <FlyToButton coords={currentLocation} />}

      {locals.map((local) => (
        <Marker
          position={[local.latitude, local.longitude]}
          key={local.slug}
          icon={getIcon()}
        >
          <Popup>
            <div className="flex flex-col items-center justify-center text-center">
              <Link href={`/local/${local.slug}`}>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-24 w-32">
                    <Image
                      src={
                        local.images.length > 0
                          ? local.images[0].image.url
                          : `/img/placeholder.svg`
                      }
                      alt={local.name}
                      width={256}
                      height={256}
                      className="h-full w-full rounded-lg object-cover object-center"
                    />
                  </div>
                  <div className="">
                    <strong className="block">{local.name}</strong>
                    <small>{local.main_category.name}</small>
                  </div>
                </div>
              </Link>
              <p>{local.address}</p>
              <AddToIninerary local={local} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
