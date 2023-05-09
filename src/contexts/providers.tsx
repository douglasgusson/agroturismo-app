import { ToasterProvider } from "@/components/ToasterProvider";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import AuthContext from './auth.provider';


const ItineraryProvider = dynamic(() => import("./itinerary.provider"), {
  ssr: false,
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <AuthContext>
        <ToasterProvider />
        <ItineraryProvider>{children}</ItineraryProvider>
      </AuthContext>
    </>
  );
}
