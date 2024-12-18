import { type MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "Agroturismo",
    short_name: "Agroturismo",
    icons: [
      {
        src: "/img/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/img/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    background_color: "#66cc8a",
    description:
      "Encontre o melhor da Capital Nacional do Agroturismo para você e sua família.",
    display: "fullscreen",
    scope: "/",
    start_url: "/",
    theme_color: "#66cc8a",
  };
}
