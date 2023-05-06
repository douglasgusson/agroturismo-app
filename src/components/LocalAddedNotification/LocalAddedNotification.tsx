import { Local } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Toast } from "react-hot-toast";

export type LocalAddedNotificationProps = {
  local: Local;
  toast: Toast;
};

export const LocalAddedNotification: React.FC<LocalAddedNotificationProps> = ({
  local,
  toast: t,
}) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              src={
                local.images.length > 0
                  ? local.images[0].image.url
                  : `/img/placeholder.svg`
              }
              alt={local.name}
              width={48}
              height={48}
              className="h-10 w-10 rounded-lg"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{local.name}</p>
            <p className="mt-1 text-sm text-gray-500">
              foi adicionado ao seu roteiro!
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <Link
          href={`/itinerary`}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Ver roteiro
        </Link>
      </div>
    </div>
  );
};

export default LocalAddedNotification;
