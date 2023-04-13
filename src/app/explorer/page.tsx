"use client";

import { fetcher } from "@/lib";
import { Local } from "@/types";
import dynamic from "next/dynamic";
import useSWR from "swr";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Page() {
  const { data: locals = [] } = useSWR<Local[]>(`/locals/`, fetcher);

  return (
    <div className="z-0 h-screen">
      <Map locals={locals} />
    </div>
  );
}
