import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  type FC,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import { getResponse, type Auth } from "../../api/fetchHelpers";
import { getAuth, saveAuth } from "../../utils/AuthStorage";
import { AuthError } from "../../types/AuthError";
import { apiSetPassword, apiSignIn } from "../../api/auth";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({ username: "", key: "" });

  useEffect(() => {
    async function initializeAuth() {
      const savedAuth = getAuth();

      console.log("Initializing auth with saved data:", savedAuth);

      // Only validate if we have saved auth credentials
      if (savedAuth.username && savedAuth.key) {
        console.log("Found saved auth, validating...");
        try {
          const validationResponse = await getResponse(
            "/user/valid",
            savedAuth,
          );
          console.log("Validation response:", validationResponse);

          if (validationResponse.code === 200) {
            setAuth(savedAuth);
          } else {
            throw new Error("Validation failed");
          }
        } catch (error) {
          console.error("Saved auth is invalid, clearing it:", error);
          // Clear invalid auth from localStorage
          saveAuth({ username: "", key: "" });
          setAuth({ username: "", key: "" });
        }
      } else {
        // No saved auth, just set empty state
        console.log("No saved auth found, using empty state");
        setAuth({ username: "", key: "" });
      }
    }

    initializeAuth();
  }, []);

  const withAuth = useCallback(
    async <T,>(fn: (auth: Auth) => T | Promise<T>): Promise<T | undefined> => {
      try {
        return await fn(auth);
      } catch (err) {
        if (err !== typeof AuthError) throw err;
        console.error("Authentication failed. Resetting global auth.", err);
        signOut();
        return undefined;
      }
    },
    [auth],
  );

  const signIn = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      try {
        const newAuth = await apiSignIn(username, password);
        console.log(newAuth);
        setAuth(newAuth);
        saveAuth(newAuth);

        return null; // Success case returns null
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Sign in failed";
        return errorMessage; // Return error message to caller
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    setAuth({ username: "", key: "" });
    saveAuth({ username: "", key: "" });
  }, []);

  const updatePassword = useCallback(
    async (newPassword: string): Promise<boolean> => {
      try {
        const success = await apiSetPassword(auth, newPassword);
        return success;
      } catch (error) {
        console.error("Failed to set password:", error);
        return false;
      }
    },
    [auth],
  );

  const isSignedIn = auth.username !== "" && auth.key !== "";

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isSignedIn,
      auth,
      withAuth,
      signIn,
      signOut,
      updatePassword,
    }),
    [isSignedIn, auth, withAuth, signIn, signOut, updatePassword],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
