"use client";

import { Local } from "@/types";
import { MapIcon, PlusIcon } from "@heroicons/react/24/outline";
import { LatLngExpression } from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type MapProps = {
  locals: Local[];
};

export const Map: FC<MapProps> = ({ locals }) => {
  const [position] = useState<LatLngExpression>([-20.332572, -41.129592]);

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locals.map(
        ({
          latitude,
          longitude,
          name,
          description,
          slug,
          main_category,
          images,
        }) => (
          <Marker position={[latitude, longitude]} key={slug}>
            <Popup>
              <div className="flex flex-col items-center justify-center text-center">
                <Link href={`/local/${slug}`}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-24">
                        <Image
                          src={
                            images.length > 0
                              ? images[0].image.url
                              : `https://api.lorem.space/image/house?w=256&h=256&hash=${Math.random()}`
                          }
                          alt="Avatar"
                          width={256}
                          height={256}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <strong className="block">{name}</strong>
                    <small>{main_category.name}</small>
                  </div>
                </Link>
                <p>{description}</p>
                <Link
                  href={`https://www.google.com/maps/dir//${latitude},${longitude}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  title="Ver rota no Google Maps"
                  className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Rota
                </Link>
                <button className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                  <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span>Adicionar ao roteiro</span>
                </button>
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
};

export default Map;
