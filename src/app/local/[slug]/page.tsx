import { AddToIninerary } from "@/components/AddToIninerary/AddToIninerary";
import { ImageGallery } from "@/components/ImageGallery";
import { OpeningHoursComponent } from "@/components/OpeningHours";
import { SpecialOpeningHoursComponent } from "@/components/SpecialOpeningHours";
import { API_URL } from "@/lib";
import { Local } from "@/types";
import {
  GlobeAltIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const getLocal = async (slug: string): Promise<Local> => {
  const response = await fetch(`${API_URL}/locals/find-by-slug/${slug}`);
  const data = await response.json();
  return data;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const local = await getLocal(params.slug);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="w-full">
        {local.images.length > 0 && (
          <div className="relative h-96">
            <div className="absolute inset-0">
              <Image
                src={local.images[0].image.url}
                alt={local.images[0].image.alt_text}
                width={local.images[0].image.width}
                height={local.images[0].image.height}
                className="h-full w-full rounded-lg object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 sm:flex sm:justify-end sm:p-4">
              <ImageGallery images={local.images.map(({ image }) => image)} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between space-y-2 py-8">
        <h1 className="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
          <span className="block text-emerald-600">{local.name}</span>
          <small className="block text-2xl text-gray-500">
            {local.main_category.name}
          </small>
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <AddToIninerary local={local} />
          <Link
            href={`https://www.google.com/maps/dir//${local.latitude},${local.longitude}/`}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            title="Ver rota no Google Maps"
            className="inline-flex items-center rounded-full border border-transparent bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            Rota
          </Link>
        </div>
      </div>

      <p className="flex items-center text-left text-gray-500">
        <MapPinIcon
          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <span>{local.address}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2 py-4">
        {local.phone && (
          <Link
            href={`tel:${local.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-left text-gray-500"
          >
            <PhoneIcon
              className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span>{local.phone}</span>
          </Link>
        )}

        {local.website && (
          <Link
            href={local.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-left text-gray-500"
          >
            <GlobeAltIcon
              className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span>{local.website}</span>
          </Link>
        )}
      </div>

      {/* Horário de funcionamento especial */}
      <SpecialOpeningHoursComponent local={local} />

      {/* Horário de funcionamento */}
      <OpeningHoursComponent local={local} />

      {local.description && (
        <article className="prose-lg py-8">{local.description}</article>
      )}
    </div>
  );
}
