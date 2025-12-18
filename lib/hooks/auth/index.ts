import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

/**
 * Custom hook to access auth context
 * @returns AuthContextValue
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
