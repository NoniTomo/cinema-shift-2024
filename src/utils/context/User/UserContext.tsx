import { createContext } from 'react';
import {
  CancelCinemaOrderDto,
  CreateOtpDto,
  Order,
  Profile,
  SignInDto,
  UpdateProfileDto
} from '../../types/dto';

export const defaultValueUserData = {
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  city: '',
  phone: ''
};

export const defaultValueOrders: Order[] = [];

export type UserContextType = {
  handleSignIn: (data: SignInDto) => Promise<void>;
  handleLogOut: () => void;
  handleGetSession: () => Promise<void>;
  handleUpdateProfile: (data: UpdateProfileDto) => Promise<void>;
  handleGetOtpsCode: (data: CreateOtpDto) => Promise<number | void>;
  handleGetAllOrders: () => Promise<void>;
  handleCancelOrder: (data: CancelCinemaOrderDto) => Promise<void>;

  orders: Order[];
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
  handleGetAllOrders: async () => {},
  handleCancelOrder: async (data: CancelCinemaOrderDto) => {},

  isUserLogged: false,
  userData: defaultValueUserData,
  orders: defaultValueOrders,
  loading: false,
  error: false
});
