"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export const Search = ({ disabled }: { disabled?: boolean }) => {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const searchText = e.currentTarget.search.value;

      if (!searchText) return;

      const params = new URLSearchParams();
      params.set("q", searchText);

      startTransition(() => push(`/search?${params.toString()}`));
    },
    [push, startTransition]
  );

  return (
    <form className="w-full sm:max-w-xs" onSubmit={handleSearch}>
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="rounded-md shadow-sm">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <SearchIcon
              className="mr-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Input
            type="text"
            name="search"
            id="search"
            disabled={disabled || isPending}
            placeholder="Buscar por locais, categorias, etc..."
            className="pl-10"
            spellCheck={false}
          />
        </div>

        {isPending && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-emerald-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>
    </form>
  );
}
