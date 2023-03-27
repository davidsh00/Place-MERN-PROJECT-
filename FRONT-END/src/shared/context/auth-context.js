import { createContext } from "react";
export const authContext = createContext({
  isLoggedIn: false,
  user: {
    id: null,
    email: null,
    name: null,
  },
  login: () => {},
  logout: () => {},
});
