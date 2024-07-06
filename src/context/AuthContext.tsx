/* import { createContext, useState, useEffect } from "react";
import axios from "axios";
import inMemoryJWT from "../utils/inMemoryJWT";
import config from "../config";

//instance axios для отправки запроса на сервер
export const AuthClient = axios.create({
  baseURL: `${config.PUBLIC_SERVER_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${config.PUBLIC_SERVER_URL}/main`,
  withCredentials: true,
});

export const RequestClient = axios.create({
    baseURL: `${config.PUBLIC_SERVER_URL}/main`,
    withCredentials: true,
  });

RequestClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();

      })
      .catch((error) => console.log(error));
  };

  const handleSignIn = (data) => {
    return AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        return { isItError: false };
      })
      .catch((err) => {
          console.log(err);
          return { isItError: true };
      });    
  };

  useEffect(() => {
    const handlePersistedLogOut = (event) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
    value={{
        handleSignIn,
        handleLogOut,
        isAppReady,
        isUserLogged,
    }}
    >
    {isAppReady ? (
        children
    ) : (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'inline-block',
          margin: 'auto auto'
        }}>
          <div>Loading...</div>
        </div>
    )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
 */