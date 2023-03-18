import { createContext } from "react";
import { UserProfile } from "@packages/api/models/users/userProfile";

export const AuthContext = createContext<{
  currentUser: UserProfile | undefined;
  setCurrentUser: (value: UserProfile | undefined) => void;
}>({
  currentUser: undefined,
  setCurrentUser: () => {},
});
