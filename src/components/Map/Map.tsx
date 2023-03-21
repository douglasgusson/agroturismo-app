"use client";

import { LatLngExpression } from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type Local = {
  name: string;
  slug: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const Map: FC = () => {
  const [position, setPosition] = useState<LatLngExpression>([
    -20.332572, -41.129592,
  ]);

  const [locals, setLocals] = useState<Local[]>([
    {
      name: "Vinícola Tonole",
      slug: "vinicola-tonole",
      description: "Vinícola",
      address:
        "Rodovia Pedro Collor, Km 4, s/n - Zona Rural, Venda Nova do Imigrante - ES, 29375-000",
      latitude: -20.3629022,
      longitude: -41.1189408,
    },
    {
      name: "Queijos Monticiello",
      slug: "queijos-monticiello",
      description: "Loja de queijos",
      address:
        "Sítio Santa Tereza - Tapera, Venda Nova do Imigrante - ES, 29375-000",
      latitude: -20.3261393,
      longitude: -41.1212182,
    },
    {
      name: "Piwo Cervejaria",
      slug: "piwo-cervejaria",
      description: "Cervejaria",
      address: "Rodovia-ES, 473 km 3 Viçosinha - São João de Viçosa, Venda Nova do Imigrante - ES, 29375-000",
      latitude: -20.355606446900193, 
      longitude: -41.18726883310345
    }
  ]);

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
        ({ latitude, longitude, name, description, address, slug }) => (
          <Marker position={[latitude, longitude]} key={slug}>
            <Popup>
              <div className="flex flex-col items-center justify-center text-center">
                <Link href={`/local/${slug}`}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="avatar">
                      <div className="mask mask-squircle w-24">
                        <Image
                          src={`https://api.lorem.space/image/house?w=256&h=256&hash=${Math.random()}`}
                          alt="Avatar"
                          width={256}
                          height={256}
                        />
                      </div>
                    </div>
                    <strong className="block">{name}</strong>
                    <small>{description}</small>
                  </div>
                </Link>
                <p>{address}</p>
                <Link
                  href={`https://www.google.com/maps/dir//${latitude},${longitude}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="btn-primary btn-sm btn gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>
                  Rota
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
};

export default Map;
