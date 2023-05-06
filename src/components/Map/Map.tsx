"use client";

import { useItinerary } from "@/hooks";
import { Local } from "@/types";
import { MapIcon } from "@heroicons/react/24/outline";
import L from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AddToIninerary } from "../AddToIninerary/AddToIninerary";

export type MapProps = {
  locals: Local[];
};

const getIcon = (category: string) => {
  const icon = L.icon({
    iconUrl: `/img/markers/${category}.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 0],
    shadowUrl: "/img/markers/pin.png",
    shadowSize: [50, 50],
    shadowAnchor: [25, 5],
  });

  return icon;
};

export const Map: FC<MapProps> = ({ locals }) => {
  const { centerCoords } = useItinerary();

  return (
    <MapContainer
      center={centerCoords}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locals.map((local) => (
        <Marker
          position={[local.latitude, local.longitude]}
          key={local.slug}
          icon={getIcon(local.main_category.slug)}
        >
          <Popup>
            <div className="flex flex-col items-center justify-center text-center">
              <Link href={`/local/${local.slug}`}>
                <div className="flex flex-col items-center justify-center">
                  <div className="avatar">
                    <div className="mask mask-squircle w-24">
                      <Image
                        src={
                          local.images.length > 0
                            ? local.images[0].image.url
                            : `/img/placeholder.svg`
                        }
                        alt="Avatar"
                        width={256}
                        height={256}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <strong className="block">{local.name}</strong>
                  <small>{local.main_category.name}</small>
                </div>
              </Link>
              <p>{local.description}</p>
              <Link
                href={`https://www.google.com/maps/dir//${local.latitude},${local.longitude}/`}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                title="Ver rota no Google Maps"
                className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Rota
              </Link>
              <AddToIninerary local={local} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
