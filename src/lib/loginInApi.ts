import { Credentials } from "@/types";
import { API_URL } from "./fetcher";

export const loginInApi = async (credentials: Credentials) => {
  try {
    const res = await fetch(`${API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "",
        username: credentials.username,
        password: credentials.password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    });

    const data = (await res.json()) as {
      access_token: string;
      refresh_token: string;
      token_type: string;
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error when trying to login", { cause: error });
  }
};
