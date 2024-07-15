import { defaultValueOrders, defaultValueUserData, UserContext } from './UserContext';
import { useState, ReactNode, useEffect } from 'react';
import {
  CancelCinemaOrderDto,
  CreateOtpDto,
  Order,
  Profile,
  SignInDto,
  UpdateProfileDto
} from '../../types/dto';
import { toast } from 'react-toastify';
import { RequestClient } from '@/utils/axiosAPI';

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [loading, setIsLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [error, setIsError] = useState(false);
  const [userData, setUserData] = useState<Profile>(defaultValueUserData);
  const [orders, setOrders] = useState<Order[]>(defaultValueOrders);

  const handleLogOut = () => {
    setIsUserLogged(false);
    setUserData(defaultValueUserData);
    delete localStorage.token;
  };

  const handleSignIn = async (data: SignInDto) => {
    setIsLoading(true);
    setIsError(false);
    await RequestClient.post('/users/signin', data)
      .then((res) => {
        if (res.data.success) {
          setIsUserLogged(true);
          localStorage.setItem('token', res.data.token);
          setUserData({ ...defaultValueUserData, phone: data.phone });
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = async (data: UpdateProfileDto) => {
    setIsLoading(true);
    await RequestClient.patch('/users/profile', data)
      .then((res) => {
        if (res.data.success) {
          setIsUserLogged(true);
          setIsError(false);
          console.log(res.data);
          setUserData(res.data.profile);
          toast.success('Данные обновлены', {
            position: 'top-left'
          });
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      });
    await handleGetSession();
    setIsLoading(false);
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
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGetOtpsCode = async (data: CreateOtpDto): Promise<number | void> => {
    setIsLoading(true);
    setIsError(false);
    return await RequestClient.post('/auth/otp', data)
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
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancelOrder = async (data: CancelCinemaOrderDto): Promise<void> => {
    setIsLoading(true);
    setIsError(false);
    await RequestClient.put('/cinema/orders/cancel', data)
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    await handleGetAllOrders();
  };

  const handleGetAllOrders = async () => {
    setIsLoading(true);
    setIsError(false);
    await RequestClient.get('/cinema/orders')
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        handleSignIn,
        handleLogOut,
        handleGetSession,
        handleGetOtpsCode,
        handleGetAllOrders,
        handleUpdateProfile,
        handleCancelOrder,

        isUserLogged,
        userData,
        orders,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
