import { createContext, useContext } from "react";
import type { Auth } from "../../api/fetchHelpers";

interface IAuthContext {
  isSignedIn: boolean;
  auth: Auth;
  withAuth: <T, >(fn: (auth: Auth) => T | Promise<T>) => Promise<T | undefined>;
  signIn: (username: string, password: string) => Promise<string | null>;
  signOut: () => void;
  updatePassword: (newPassword: string) => Promise<boolean>;
};

export const AuthContext = createContext<IAuthContext>({
  auth: {
    username: "",
    key: ""
  },
  withAuth: async <T,>(fn: (auth: Auth) => T | Promise<T>) => {
    try {
      return await fn({ username: "", key: "" });
    } catch {
      return undefined;
    }
  },
  signIn: async () => await new Promise(() => null),
  signOut: () => undefined,
  updatePassword: async () => await Promise.resolve(false),
  isSignedIn: false,
});

export const useAuth = () => {
  try {
    return useContext(AuthContext);
  } catch {
    throw new Error("useAuth must be used within an AuthProvider");
  }
};