import { ToasterProvider } from "@/components/ToasterProvider";
import { Local } from "@/types";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import AuthContext from "./auth.provider";

const ItineraryProvider = dynamic(() => import("./itinerary.provider"), {
  ssr: false,
});

export function Providers({
  children,
  initialLocals = [],
}: PropsWithChildren<{
  initialLocals?: Local[];
}>) {
  return (
    <>
      <AuthContext>
        <ToasterProvider />
        <ItineraryProvider initialLocals={initialLocals}>
          {children}
        </ItineraryProvider>
      </AuthContext>
    </>
  );
}
