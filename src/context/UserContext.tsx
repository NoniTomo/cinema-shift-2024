import { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { CreateOtpDto, Profile, SignInDto, UpdateProfileDto } from '../types/dto';
import { toast } from 'react-toastify';

export const RequestClient = axios.create({
  baseURL: config.PUBLIC_SERVER_URL
});

export const RequestClientWithoutToken = axios.create({
  baseURL: config.PUBLIC_SERVER_URL
});

RequestClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const defaultValue = {
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  city: ''
};

export type UserContextType = {
  handleSignIn: (data: SignInDto) => Promise<void>;
  handleLogOut: () => void;
  handleGetSession: () => Promise<void>;
  handleUpdateProfile: (data: UpdateProfileDto) => Promise<void>;
  handleGetOtpsCode: (data: CreateOtpDto) => Promise<number | void>;

  isUserLogged: boolean;
  userData: Profile;
  loading: boolean;
  error: boolean;
};

export const UserContext = createContext<UserContextType>({
  handleSignIn: async (data: SignInDto) => {},
  handleLogOut: () => {},
  handleGetSession: async () => {},
  handleUpdateProfile: async (data: UpdateProfileDto) => {},
  handleGetOtpsCode: async (data: CreateOtpDto) => {},

  isUserLogged: false,
  userData: defaultValue,
  loading: false,
  error: false
});

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [loading, setIsLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [error, setIsError] = useState(false);
  const [userData, setUserData] = useState<Profile>(defaultValue);

  const handleLogOut = () => {
    setIsUserLogged(false);
    delete localStorage.token;
  };

  const handleSignIn = async (data: SignInDto) => {
    setIsLoading(true);
    setIsError(false);
    await RequestClientWithoutToken.post('/users/signin', data)
      .then((res) => {
        if (res.data.success) {
          setIsUserLogged(true);
          localStorage.setItem('token', res.data.token);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = async (data: UpdateProfileDto) => {
    setIsLoading(true);
    await RequestClient.post('/users/profile', data)
      .then((res) => {
        if (res.data.success) {
          setIsUserLogged(true);
          setIsError(false);
          setUserData(res.data.user);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGetSession = async () => {
    setIsLoading(true);
    setIsError(false);
    await RequestClient.get('/users/session', {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.success) {
          setIsUserLogged(true);
          setIsError(false);
          setUserData(res.data.user);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGetOtpsCode = async (data: CreateOtpDto): Promise<number | void> => {
    setIsLoading(true);
    setIsError(false);
    console.log('handleGetOtpsCode = ', data);
    return await RequestClientWithoutToken.post('/auth/otp', data)
      .then((res) => {
        setIsUserLogged(false);

        if (res.data.success) {
          return res.data.retryDelay;
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetSession();
  }, []);

  console.log('isUserLogged = ', isUserLogged);
  return (
    <UserContext.Provider
      value={{
        handleSignIn,
        handleLogOut,
        handleGetSession,
        handleUpdateProfile,
        handleGetOtpsCode,

        isUserLogged,
        userData,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
