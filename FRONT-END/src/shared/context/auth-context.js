import { createContext } from "react";
export const authContext = createContext({
  isLoggedIn: false,
  user: {
    token: null,
    id: null,
    email: null,
    name: null,
  },
  login: () => {},
  logout: () => {},
});
