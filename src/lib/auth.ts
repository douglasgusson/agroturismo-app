import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginInApi } from './loginInApi';

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Nome de usuário",
          type: "username",
          placeholder: "nomedeusuario",
        },
        password: { label: "Senha", type: "password", placeholder: "********" },
      },
      async authorize (credentials) {
        const { username = "", password = "" } = credentials ?? {};
        try {
          const userAuthData = await loginInApi({
            username,
            password,
          });
          return userAuthData;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user }) {
      return { ...token, ...user };
    },
    async session ({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      }
    },
  },
};
