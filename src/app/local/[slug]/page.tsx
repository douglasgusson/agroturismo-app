import { ImageGallery } from "@/components/ImageGallery";
import { OpeningHoursComponent } from "@/components/OpeningHours";
import { SpecialOpeningHoursComponent } from "@/components/SpecialOpeningHours";
import { API_URL } from "@/lib";
import { Local } from "@/types";
import { MapIcon } from "@heroicons/react/24/outline";
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
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="relative overflow-hidden rounded-lg lg:h-96">
          <div className="absolute inset-0">
            <Image
              src={local.images[0].image.url}
              alt={local.images[0].image.alt_text}
              width={local.images[0].image.width}
              height={local.images[0].image.height}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
          <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
            <div>
              <h1 className="text-2xl font-bold text-white">{local.name}</h1>
              <p className="mt-1 text-base font-semibold text-gray-300">
                {local.main_category.name}
              </p>
              <p className="mt-1 text-sm text-gray-300">{local.description}</p>
              <p className="py-2">
                <Link
                  href={`https://www.google.com/maps/dir//${local.latitude},${local.longitude}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2"
                >
                  <MapIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Rota
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl justify-center px-4 py-4 sm:px-6 lg:max-w-7xl">
        <ImageGallery images={local.images.map(({ image }) => image)} />
      </div>

      {/* Horário de funcionamento especial */}
      <SpecialOpeningHoursComponent local={local} />

      {/* Horário de funcionamento */}
      <OpeningHoursComponent local={local} />
    </div>
  );
}
