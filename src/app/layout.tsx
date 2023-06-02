import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/contexts/providers";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agroturismo App",
  description: "Encontre o melhor da Capital Nacional do Agroturismo",
  manifest: "https://agroturismo.vercel.app/manifest.json",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html data-theme="emerald" lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </head>
      <body className={nunito.className}>
        <Providers>
          <Navbar />
          {children}
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
