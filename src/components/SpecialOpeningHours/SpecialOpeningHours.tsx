"use client";

import { fetcher } from "@/lib";
import { Local } from "@/types";
import { SpecialOpeningHours } from "@/types/opening-hours";
import useSWR from "swr";

export type SpecialOpeningHoursProps = {
  local: Local;
};

export const SpecialOpeningHoursComponent = ({
  local,
}: SpecialOpeningHoursProps) => {
  const {
    data: openingHours = [],
    error,
    isLoading,
  } = useSWR<SpecialOpeningHours[]>(
    `/special-opening-hours/?local_id=${local.id}`,
    fetcher
  );

  if (!openingHours || error || openingHours.length === 0 || isLoading) {
    return null;
  }

  return (
    <div className="mx-auto">
      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Horário de funcionamento especial
        </h2>
        <div className="mt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {openingHours.map((openingHour) => (
              <div key={openingHour.id} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  <time dateTime={openingHour.opening_date}>
                    {new Date(
                      `${openingHour.opening_date}T00:00:00`
                    ).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                    })}
                  </time>{" "}
                  - {openingHour.description}
                </dt>
                <dd className="mt-1 flex flex-col text-sm text-gray-900">
                  {openingHour.is_closed ? (
                    <span className="font-semibold text-red-500">Fechado</span>
                  ) : (
                    <span>
                      {openingHour.start_time}
                      {" - "}
                      {openingHour.end_time}
                    </span>
                  )}
                  <span className="font-semibold text-red-500">
                    {!!openingHour.start_pause_time &&
                      !!openingHour.end_pause_time &&
                      `Fechado entre ${openingHour.start_pause_time} e ${openingHour.end_pause_time}`}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
