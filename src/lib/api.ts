export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (path: string) => fetch(
  `${API_URL}${path}`,
).then((res) => res.json());

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

export const registerTourist = async (params: TouristParams): Promise<Tourist> => {
  try {
    const res = await fetch(`${API_URL}/tourists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to register", { cause: error });
  }
};
