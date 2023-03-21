import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

export const Drawer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="navbar w-full bg-primary text-primary-content">
        <div className="navbar-start">
          <div className="flex-none lg:hidden">
            <label htmlFor="app-drawer" className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            Agroturismo
          </Link>
        </div>

        <div className="navbar-center">
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <Link href="/explorer">Mapa</Link>
              </li>
              <li>
                <Link href="/itinerary">Roteiro</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <button className="btn-ghost btn-circle btn">
            <span className="sr-only">Busca</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <div className="avatar ml-2">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <Image
                src={`https://api.lorem.space/image/face?w=96&h=96&hash=${Math.random()}`}
                alt="Avatar"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="drawer">
        <input id="app-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">{children}</div>
        <div className="drawer-side">
          <label htmlFor="app-drawer" className="drawer-overlay" />
          <ul className="menu w-80 bg-base-100 p-4">
            <li>
              <Link href="/">Página inicial</Link>
            </li>
            <li>
              <Link href="/explorer">Mapa</Link>
            </li>
            <li>
              <Link href="/itinerary">Roteiro</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
