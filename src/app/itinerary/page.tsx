"use client";

import { fetcher } from "@/lib";
import { Local } from "@/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
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
              <a href="#" className="block">
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
                        <span>{local.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Link
            href={mapsRouteUrl}
            target="_blank"
            role="button"
            rel="noopener noreferrer"
            className="btn-primary btn-wide btn gap-2"
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
            Ver no Google Maps
          </Link>
        </div>
      </div>
    </section>
  );
}
