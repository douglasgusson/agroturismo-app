"use client";

import { Local } from "@/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export type ItineraryListProps = {
  locals: Local[];
};

export const ItineraryList: React.FC<ItineraryListProps> = ({ locals }) => {
  return (
    <ul role="list" className="steps steps-vertical px-4">
      {locals.map((local) => (
        <li key={local.name} className="step text-left">
          <Link href={`/local/${local.slug}`} className="block">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="truncate text-lg font-semibold">{local.name}</p>
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
  );
};
