"use client";

import { useItinerary } from "@/hooks";
import { Local } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";

export type AddToInineraryProps = {
  local: Local;
};

export const AddToIninerary: React.FC<AddToInineraryProps> = ({ local }) => {
  const { addLocal, isInItinerary, removeLocal } = useItinerary();

  const localIsInItinerary = useMemo(
    () => isInItinerary(local),
    [isInItinerary, local]
  );

  return (
    <>
      {!localIsInItinerary ? (
        <button
          onClick={() => addLocal(local)}
          disabled={localIsInItinerary}
          className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
        >
          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          <span>Adicionar ao roteiro</span>
        </button>
      ) : (
        <button
          onClick={() => removeLocal(local)}
          disabled={!localIsInItinerary}
          className="inline-flex items-center rounded-full border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
        >
          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          <span>Remover do roteiro</span>
        </button>
      )}
    </>
  );
};
