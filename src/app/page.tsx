import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
              Encontre o melhor da Capital Nacional do Agroturismo para você e sua família.
            </p>
          </div>
        </div>
      </div>

      <section className="mb-8 bg-base-200 py-24">
        <div className="container mx-auto">
          <button className="btn-primary btn gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
            Explorar
          </button>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          <div className="card bg-base-100 shadow-lg">
            <figure>
              <Image
                src="https://api.lorem.space/image/shoes?w=400&h=400"
                alt="Shoes"
                width="400"
                height="400"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Shoes!
                <div className="badge-secondary badge">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge-outline badge">Fashion</div>
                <div className="badge-outline badge">Products</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <figure>
              <Image
                src="https://api.lorem.space/image/shoes?w=400&h=400"
                alt="Shoes"
                width="400"
                height="400"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Shoes!
                <div className="badge-secondary badge">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge-outline badge">Fashion</div>
                <div className="badge-outline badge">Products</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <figure>
              <Image
                src="https://api.lorem.space/image/shoes?w=400&h=400"
                alt="Shoes"
                width="400"
                height="400"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Shoes!
                <div className="badge-secondary badge">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge-outline badge">Fashion</div>
                <div className="badge-outline badge">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
