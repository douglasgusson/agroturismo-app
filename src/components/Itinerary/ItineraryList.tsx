import { Local } from "@/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export type ItineraryListProps = {
  locals: Local[];
  onRemove: (local: Local) => void;
};

export const ItineraryList: React.FC<ItineraryListProps> = ({
  locals,
  onRemove,
}) => {
  return (
    <ul role="list" className="steps steps-vertical px-4">
      {locals.map((local) => (
        <li key={local.name} className="step text-left">
          <div className="flex items-center justify-between">
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
            <div className="flex-shrink-0 pr-2">
              <button
                onClick={() => onRemove(local)}
                title="Remover do roteiro"
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-rose-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                <span className="sr-only">Remover do roteiro</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
