import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      sub: string;
      id: number;
      access_token: string;
      refresh_token: string;
      token_type: string;
      username: string;
      disabled: boolean;
      iat: number;
      exp: number;
      jti: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    token_type: string;
  }
}
