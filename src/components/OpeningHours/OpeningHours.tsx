"use client";

import { fetcher } from "@/lib";
import { Local } from "@/types";
import { OpeningHours } from "@/types/opening-hours";
import useSWR from "swr";

export type OpeningHoursProps = {
  local: Local;
};

export const OpeningHoursComponent = ({ local }: OpeningHoursProps) => {
  const {
    data: openingHours = [],
    error,
    isLoading,
  } = useSWR<OpeningHours[]>(`/opening-hours/?local_id=${local.id}`, fetcher);

  if (!openingHours || error || openingHours.length === 0 || isLoading) {
    return null;
  }

  const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Horário de funcionamento
        </h2>
        <div className="mt-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {openingHours.map((openingHour) => (
              <div key={openingHour.id} className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {weekDays[openingHour.weekday]}
                </dt>
                <dd className="mt-1 flex flex-col text-sm text-gray-900">
                  {openingHour.is_closed ? (
                    <span className="text-red-500">Fechado</span>
                  ) : (
                    <span>
                      {openingHour.start_time}
                      {" - "}
                      {openingHour.end_time}
                    </span>
                  )}
                  <span className="text-red-500">
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
