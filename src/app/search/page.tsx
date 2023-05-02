import { LocalCard } from "@/components/LocalCard";
import { SearchResults } from "@/types";
import Link from "next/link";

const getSearchResults = async (query?: string): Promise<SearchResults> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/?query=${query}`
  );

  const data = await response.json();

  return data;
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const searchResults = await getSearchResults(searchParams?.q);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-600 sm:text-4xl">
          Resultados para: &quot;{searchParams?.q}&quot;
        </h1>

        {searchResults.categories.length > 0 ? (
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="w-full">
              <h2 className="flex items-center gap-1 text-xl font-bold text-gray-600">
                Categorias
                <small className="block text-base text-gray-400">
                  ({searchResults.categories.length})
                </small>
              </h2>
            </div>
            {searchResults.categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
              >
                {category.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-600">Categorias</h2>
            <p className="text-gray-500">
              Nenhuma categoria encontrada para a busca.
            </p>
          </div>
        )}

        {searchResults.locals.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
            <div className="col-span-full">
              <h2 className="flex items-center gap-1 text-xl font-bold text-gray-600">
                Locais
                <small className="block text-base text-gray-400">
                  ({searchResults.locals.length})
                </small>
              </h2>
            </div>

            {searchResults.locals.map((local) => (
              <LocalCard key={local.id} local={local} />
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-600">Locais</h2>
            <p className="text-gray-500">
              Nenhum local encontrado para a busca.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
