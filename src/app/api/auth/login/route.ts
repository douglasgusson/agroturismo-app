import { loginInApi } from "@/lib";
import { Credentials } from "@/types";
import { type NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  const credentials = (await request.json()) as Credentials;

  const { access_token, refresh_token } = await loginInApi(
    credentials,
  );

  return new Response(undefined, {
    status: 200,
    headers: [
      ["Set-Cookie", `access_token=${access_token}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=1800`],
      ["Set-Cookie", `refresh_token=${refresh_token}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=7200`],
    ],
  });
}
