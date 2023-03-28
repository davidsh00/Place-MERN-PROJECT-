import { useEffect, useState, useCallback } from "react";

export const useAuth = () => {
  const [isLoading, setIsloading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(null);
  const [user, setUser] = useState({});
  let timer;
  const login = useCallback((user, expired) => {
    const userObj = {
      name: user.name,
      email: user.email,
      id: user.id,
      token: user.token,
    };
    setUser(userObj);
    const expiredToken = expired || new Date(new Date().getTime() + 2000);
    setTokenExpired(expiredToken);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userObj, expiredToken: expiredToken })
    );
    clearTimeout(timer);
  }, []);
  const logout = useCallback(() => {
    setUser({ userId: null, email: null, name: null, token: null });
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    if (!!tokenExpired) {
      const reminingTime = new Date(tokenExpired).getTime() - Date.now();
      console.log("timer run");
      timer = setTimeout(() => {
        logout();
      }, reminingTime);
    }
    return () => clearTimeout(timer);
  }, [tokenExpired, logout]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      userData.id &&
      new Date(userData.expiredToken).getTime() > Date.now()
    ) {
      login(userData, userData.expiredToken);
    }
    setIsloading(false);
  }, [login]);
  return { isLoading, user, login, logout };
};
