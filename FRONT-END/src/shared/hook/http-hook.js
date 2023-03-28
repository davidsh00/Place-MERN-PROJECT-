import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { authContext } from "../context/auth-context";

export const useHttpClient = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const activeHttpReq = useRef([]);
  const auth = useContext(authContext);

  const sendReq = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      const httpAbortCtrl = new AbortController();
      activeHttpReq.current.push(httpAbortCtrl);

      const finallHeader = { ...headers };
      if (!!auth.user.token) {
        finallHeader.Authorization = "bearer " + auth.user.token;
      }
      setIsloading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: finallHeader,
          body,
        });
        let responseData;
        if (response.status !== 204) {
          responseData = await response.json();
        }
        activeHttpReq.current = activeHttpReq.current.filter(
          (abortCtrl) => abortCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsloading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsloading(false);
        throw error;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpReq.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, clearError, sendReq };
};
