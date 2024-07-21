import { getSession } from '@/utils/api/requests';
import { defaultValueOrders, defaultValueUserData, UserContext } from './UserContext';
import { useState, ReactNode, useEffect } from 'react';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { showError } from '@/utils/helpers';

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userData, setUserData] = useState<Profile>(defaultValueUserData);
  const [orders, setOrders] = useState<CinemaOrder[]>(defaultValueOrders);

  const getSessionQuery = useQuery(() => getSession(), {
    keys: [isUserLogged],
    select: (response) => {
      return response.data.user;
    },
    onSuccess: (user) => {
      setUserData(user);
      setIsUserLogged(true);
    },
    onError: (data) => {
      showError(data.message);
      setIsUserLogged(false);
    },
    enabled: false
  })

  const handleLogIn = () => setIsUserLogged(true);

  const handleLogOut = () => {
    setIsUserLogged(false);
    setUserData(defaultValueUserData);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    (!isUserLogged) && getSessionQuery.refetch();
  }, [isUserLogged])

  return (
    <UserContext.Provider
      value={{
        handleLogOut,
        handleLogIn,
        setUserData,
        setOrders,

        isUserLogged,
        userData,
        orders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
