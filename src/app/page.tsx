import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

import { API_URL } from "@/lib";
import { Local } from "@/types";
import dynamic from "next/dynamic";

const Filters = dynamic(() => import("@/components/Filters"), {
  ssr: false,
  loading: () => <p>Carregando...</p>,
});

const getLocals = async (): Promise<Local[]> => {
  const response = await fetch(`${API_URL}/locals/`);
  const data = await response.json();
  return data;
};

export default async function Home() {
  const locals = await getLocals();

  return (
    <main className={inter.className}>
      <div className="hero bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            className="w-full max-w-sm"
            src="/img/nature.svg"
            alt="Desenho de natureza"
            width={500}
            height={500}
          />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Agroturismo</span>
              <span className="block">de Venda Nova</span>
              <span className="block">do Imigrante</span>
            </h1>

            <p className="py-6">
              Encontre o melhor da Capital Nacional do Agroturismo para você e
              sua família.
            </p>
          </div>
        </div>
      </div>

      <section className="mb-8 py-8">
        <Filters />
      </section>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {locals.map((local) => (
            <div key={local.id} className="card bg-base-100 shadow-lg">
              <figure>
                <Image
                  src={
                    local.images.length > 0
                      ? local.images[0].image.url
                      : `https://api.lorem.space/image/house?w=400&h=400&hash=${Math.random()}`
                  }
                  alt={local.images[0].image.alt_text || local.name}
                  width={local.images[0].image.width || 400}
                  height={local.images[0].image.height || 400}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{local.name}</h2>
                <p>{local.main_category.name}</p>
                <div className="card-actions justify-end">
                  <div className="badge-outline badge">Fashion</div>
                  <div className="badge-outline badge">Products</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
