import { createContext } from 'react';

export const defaultValueUserData = {
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  city: '',
  phone: ''
};

export const defaultValueOrders: CinemaOrder[] = [];

export type UserContextType = {
  handleLogOut: () => void;
  handleLogIn: () => void,
  setUserData: (userData: Profile) => void,
  setOrders: (orders: CinemaOrder[]) => void,

  orders: CinemaOrder[];
  isUserLogged: boolean;
  userData: Profile;
};

export const UserContext = createContext<UserContextType>({
  handleLogOut: () => { },
  handleLogIn: () => { },
  setUserData: (userData: Profile) => { },
  setOrders: (orders: CinemaOrder[]) => { },
  isUserLogged: false,
  userData: defaultValueUserData,
  orders: defaultValueOrders
});
