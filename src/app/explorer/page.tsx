"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="z-0 h-screen">
      <Map />
    </div>
  );
}
