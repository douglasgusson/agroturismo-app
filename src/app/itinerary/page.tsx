"use client";

import { Local } from "@/components/Map/Map";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Page() {
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
  ]);

  return (
    <section className="mb-8 py-8">
      <div className="mx-auto max-w-lg overflow-hidden shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {locals.map((local) => (
            <li key={local.name}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-lg font-semibold">{local.name}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {local.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <MapPinIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>{local.address}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
