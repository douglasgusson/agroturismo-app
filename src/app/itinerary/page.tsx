import dynamic from "next/dynamic";

const Itinerary = dynamic(() => import("@/components/Itinerary"), {
  ssr: false,
});

export default function Page() {
  return <Itinerary />;
}
