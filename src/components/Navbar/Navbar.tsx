"use client";

import { useItinerary } from "@/hooks";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  QueueListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";

const navigation = [
  {
    name: "Página inicial",
    href: "/",
    icon: <HomeIcon className="mr-2 h-5 w-5" />,
  },
  {
    name: "Mapa",
    href: "/explorer",
    icon: <MapIcon className="mr-2 h-5 w-5" />,
  },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const { count } = useItinerary();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = React.useState(
    searchParams.get("q") ?? ""
  );

  return (
    <header className="bg-white">
      <Disclosure as="div" className="shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="relative z-50 flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link
                      href="/"
                      title="Página inicial"
                      className="flex items-center"
                    >
                      <>
                        <Image
                          className="block h-12 w-auto"
                          src="/img/nature.svg"
                          alt="Desenho de natureza"
                          width={48}
                          height={48}
                        />
                        <span className="ml-2 hidden text-2xl font-bold text-emerald-700 md:block">
                          Agroturismo
                        </span>
                      </>
                    </Link>
                  </div>
                </div>
                <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                  <form action="/search" className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Busca
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="q"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        required
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-emerald-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                        placeholder="Buscar por locais, categorias, etc..."
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:relative lg:z-[500] lg:ml-4 lg:flex lg:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      {session ? (
                        <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-500">
                            <span className="font-medium leading-none text-white uppercase">
                              {session.user.username.charAt(0)}
                            </span>
                          </span>
                        </Menu.Button>
                      ) : (
                        <>
                          <Link href="/account/register" className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200">
                            Cadastro
                          </Link>
                          <button onClick={() => signIn()} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
                            Entrar
                          </button>
                        </>
                      )}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/account/my-itineraries"
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Meus roteiros
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "w-full px-4 py-2 text-sm text-gray-700 text-left"
                              )}
                            >
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <nav
                className="top-0 z-10 hidden lg:flex lg:space-x-8 lg:py-2"
                aria-label="Global"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.href === pathname
                        ? "bg-emerald-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.href === pathname ? "page" : undefined}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

                <Link
                  href="/itinerary"
                  className={clsx(
                    "/itinerary" === pathname
                      ? "bg-emerald-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={"/itinerary" === pathname ? "page" : undefined}
                >
                  <QueueListIcon className="mr-2 h-5 w-5" />
                  Roteiro
                  <span className="absolute -right-2 -top-1 inline-flex items-center justify-center rounded-full bg-rose-500 px-2 py-1 text-xs font-bold leading-none text-white">
                    {count}
                  </span>
                </Link>
              </nav>
            </div>

            <Disclosure.Panel
              as="nav"
              className="lg:hidden"
              aria-label="Global"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={clsx(
                      item.href === pathname
                        ? "bg-emerald-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "flex rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.href === pathname ? "page" : undefined}
                  >
                    {item.icon}
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as={Link}
                  href="/itinerary"
                  className={clsx(
                    "/itinerary" === pathname
                      ? "bg-emerald-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "flex space-x-2 rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={"/itinerary" === pathname ? "page" : undefined}
                >
                  <QueueListIcon className="mr-2 h-5 w-5" />
                  Roteiro
                  <span className="inline-flex items-center justify-center rounded-full bg-rose-500 px-2 py-1 text-xs font-bold leading-none text-white">
                    {count}
                  </span>
                </Disclosure.Button>
              </div>
              {session ? (
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-500">
                        <span className="font-medium leading-none uppercase text-white">
                          {session.user.username.charAt(0)}
                        </span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        @{session.user.username}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as={Link}
                      href="/account/my-itineraries"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      Meus roteiros
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={() => signOut()}
                      className="rounded-md w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      Sair
                    </Disclosure.Button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as={Link}
                        href="/login"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Entrar
                      </Disclosure.Button>
                      <Disclosure.Button
                        as={Link}
                        href="/account/register"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Cadastrar
                      </Disclosure.Button>
                    </div>
                  </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
