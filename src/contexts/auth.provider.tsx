"use client";

import { Credentials } from "@/types";
import { PropsWithChildren, createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (params: Credentials) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const isAuthenticated = false;

  async function signIn(params: Credentials) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(params),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
