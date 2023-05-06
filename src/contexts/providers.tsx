"use client";

import { ToasterProvider } from "@/components/ToasterProvider";
import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth.provider";
import { ItineraryProvider } from "./itinerary.provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <AuthProvider>
        <ToasterProvider />
        <ItineraryProvider>{children}</ItineraryProvider>
      </AuthProvider>
    </>
  );
}
