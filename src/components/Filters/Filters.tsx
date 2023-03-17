"use client";

import { Disclosure } from "@headlessui/react";

const filters = {
  price: [
    { value: "0", label: "$0 - $25", checked: false },
    { value: "25", label: "$25 - $50", checked: false },
    { value: "50", label: "$50 - $75", checked: false },
    { value: "75", label: "$75+", checked: false },
  ],
  color: [
    { value: "white", label: "White", checked: false },
    { value: "beige", label: "Beige", checked: false },
    { value: "blue", label: "Blue", checked: true },
    { value: "brown", label: "Brown", checked: false },
    { value: "green", label: "Green", checked: false },
    { value: "purple", label: "Purple", checked: false },
  ],
  size: [
    { value: "xs", label: "XS", checked: false },
    { value: "s", label: "S", checked: true },
    { value: "m", label: "M", checked: false },
    { value: "l", label: "L", checked: false },
    { value: "xl", label: "XL", checked: false },
    { value: "2xl", label: "2XL", checked: false },
  ],
  category: [
    { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
    { value: "tees", label: "Tees", checked: false },
    { value: "objects", label: "Objects", checked: false },
    { value: "sweatshirts", label: "Sweatshirts", checked: false },
    { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
  ],
};

export const Filters = () => {
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10 grid items-center border-t border-b border-gray-200"
    >
      <h2 id="filter-heading" className="sr-only">
        Filtros
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex container space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          <div>
            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
              2 Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button type="button" className="text-gray-500">
              Limpar
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-t border-gray-200 py-10">
        <div className="mx-auto grid container grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8 mb-12">
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Price</legend>
              <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                {filters.price.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`price-${optionIdx}`}
                      name="price[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`price-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="block font-medium">Color</legend>
              <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                {filters.color.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`color-${optionIdx}`}
                      name="color[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`color-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Size</legend>
              <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                {filters.size.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`size-${optionIdx}`}
                      name="size[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`size-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="block font-medium">Category</legend>
              <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                {filters.category.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`category-${optionIdx}`}
                      name="category[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="checkbox-primary checkbox"
                      defaultChecked={option.checked}
                    />
                    <label
                      htmlFor={`category-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="btn btn-primary btn-wide gap-2">
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
            Aplicar
          </button>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};
