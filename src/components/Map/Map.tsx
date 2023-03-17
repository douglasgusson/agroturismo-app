"use client";

import { LatLngExpression } from "leaflet";
import Link from "next/link";
import { FC, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type Local = {
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const Map: FC = () => {
  const [position, setPosition] = useState<LatLngExpression>([
    -20.35712, -41.0594696,
  ]);

  const [locals, setLocals] = useState<Local[]>([
    {
      name: "Vinícola Tonole",
      description: "Vinícola",
      address:
        "Rodovia Pedro Collor, Km 4, s/n - Zona Rural, Venda Nova do Imigrante - ES, 29375-000",
      latitude: -20.3629022,
      longitude: -41.1189408,
    },
    {
      name: "Queijos Monticiello",
      description: "Loja de queijos",
      address:
        "Sítio Santa Tereza - Tapera, Venda Nova do Imigrante - ES, 29375-000",
      latitude: -20.3261393,
      longitude: -41.1212182,
    },
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
        ({ latitude, longitude, name, description, address }, key) => (
          <Marker position={[latitude, longitude]} key={key}>
            <Popup>
              <strong className="block">{name}</strong>
              <p>{description}</p>
              <p>
                <address>{address}</address>
              </p>
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
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
};

export default Map;
