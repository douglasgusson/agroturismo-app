import Image from "next/image";

import { LocalCard } from "@/components/LocalCard";
import { API_URL } from "@/lib";
import { Local } from "@/types";
import dynamic from "next/dynamic";

export const revalidate = 600;

const Filters = dynamic(() => import("@/components/Filters"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto flex h-14 max-w-7xl items-center justify-center">
      <span>Carregando...</span>
    </div>
  ),
});

const getLocals = async (): Promise<Local[]> => {
  const response = await fetch(`${API_URL}/locals/`);
  const data = await response.json();
  return data;
};

export default async function Home() {
  const locals = await getLocals();

  return (
    <main>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-8 sm:flex-row md:px-16 lg:flex-row-reverse lg:justify-between">
          <div className="w-full rounded-lg lg:max-w-md">
            <Image
              className="mx-auto w-full max-w-xs"
              src="/img/nature.svg"
              alt="Desenho de natureza"
              width={500}
              height={500}
            />
          </div>
          <div className="mx-auto text-center md:max-w-2xl md:text-left lg:mx-0 lg:max-w-xl lg:text-left">
            <h1>
              <span className="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block text-gray-800">Agroturismo de</span>
                <span className="block text-emerald-600">
                  Venda Nova do Imigrante
                </span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Encontre o melhor da Capital Nacional do Agroturismo para você e
              sua família.
            </p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <Filters />
      </section>

      <div className="container mx-auto mb-8 max-w-7xl px-8 md:px-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
          {locals.map((local) => (
            <LocalCard key={local.id} local={local} />
          ))}
        </div>
      </div>
    </main>
  );
}
