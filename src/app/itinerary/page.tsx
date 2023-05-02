"use client";

import { fetcher } from "@/lib";
import { Local } from "@/types";
import { MapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";

export default function Page() {
  const { data: locals = [] } = useSWR<Local[]>(`/locals/`, fetcher);

  const mapsRouteUrl = useMemo(() => {
    return locals.reduce((acc, local) => {
      return `${acc}${local.latitude},${local.longitude}/`;
    }, `https://www.google.com/maps/dir//`);
  }, [locals]);

  return (
    <section className="mb-8 py-8">
      <div className="mx-auto max-w-lg">
        <ul role="list" className="steps steps-vertical px-4">
          {locals.map((local) => (
            <li key={local.name} className="step text-left">
              <Link href={`/local/${local.slug}`} className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-lg font-semibold">
                      {local.name}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {local.main_category.name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex">
                      <p className="flex items-center text-left text-sm text-gray-500">
                        <MapPinIcon
                          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>{local.address}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center">
          <Link
            href={mapsRouteUrl}
            target="_blank"
            role="button"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            Ver itinerário no mapa
          </Link>
        </div>
      </div>
    </section>
  );
}
