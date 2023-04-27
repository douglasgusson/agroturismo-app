"use client";

import { Image } from "@/types";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export type ImageGalleryProps = {
  images: Image[];
};

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);

  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt_text,
    width: image.width,
    height: image.height,
  }));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center border border-transparent bg-rose-500 px-4 py-2 font-semibold leading-tight text-white opacity-90 shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 sm:w-auto sm:rounded-md"
      >
        <PhotoIcon className="mr-2 h-5 w-5" aria-hidden="true" />
        <span>Mostrar todas as fotos</span>
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Zoom, Counter, Thumbnails]}
      />
    </>
  );
};
