import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itineraryLocals = searchParams.getAll("locals").map((local) => Number(local));
  const isReorder = searchParams.get("reorder") === "true";

  // get itinerary cookie
  const cookieStore = cookies();
  const itineraryCookie = cookieStore.get("itinerary");
  const itinerary = JSON.parse(itineraryCookie?.value || "[]") as number[];

  // reorder itinerary
  if (isReorder) {
    itinerary.sort((a, b) => {
      const aIndex = itineraryLocals.indexOf(a);
      const bIndex = itineraryLocals.indexOf(b);
      return aIndex - bIndex;
    });
  }

  // merge itinerary cookie with itinerary locals
  itineraryLocals.forEach((local) => {
    if (!itinerary.includes(local)) {
      itinerary.push(local);
    } 
  });

  const response = NextResponse.json(itinerary);

  // set cookie with itinerary (max age 1 month)
  response.headers.set(
    "Set-Cookie",
    `itinerary=${JSON.stringify(itinerary)}; path=/; Max-Age=2592000`
  );

  return response;
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const local = Number(searchParams.get("local"));

  // get itinerary cookie
  const cookieStore = cookies();
  const itineraryCookie = cookieStore.get("itinerary");
  const itinerary = JSON.parse(itineraryCookie?.value || "[]") as number[];

  // remove local from itinerary
  const index = itinerary.indexOf(local);
  if (index > -1) {
    itinerary.splice(index, 1);
  }

  const response = NextResponse.json(itinerary);

  // set cookie with itinerary (max age 1 month)
  response.headers.set(
    "Set-Cookie",
    `itinerary=${JSON.stringify(itinerary)}; path=/; Max-Age=2592000`
  );

  return response;
}
