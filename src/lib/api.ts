import { Local } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (path: string) =>
  fetch(`${API_URL}${path}`).then((res) => res.json());

export type TouristParams = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type Tourist = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export const registerTourist = async (
  params: TouristParams
): Promise<Tourist> => {
  try {
    const res = await fetch(`${API_URL}/tourists/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = (await res.json()) as Tourist;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to register", { cause: error });
  }
};

export const getLocals = async (ids: number[] = []): Promise<Local[]> => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", String(id)));
    const res = await fetch(`${API_URL}/locals/?${params.toString()}`);
    const data = await res.json();
    return data as Local[];
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to get locals", { cause: error });
  }
};

export const removeLocalFromItinerary = async (local: number) => {
  try {
    const res = await fetch(`/api/itinerary?local=${local}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data as number[];
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to remove local from itinerary", {
      cause: error,
    });
  }
};

export const saveItinerary = async (locals: number[], isReorder = false) => {
  try {
    const params = new URLSearchParams();
    locals.forEach((local) => params.append("locals", String(local)));
    params.append("reorder", String(isReorder));

    const res = await fetch(`/api/itinerary?${params.toString()}`);
    const data = await res.json();
    return data as number[];
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to add locals to itinerary", {
      cause: error,
    });
  }
}
