import { useUser } from '@/utils/context/User';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export type PropsRouter = {
  redirectTo: string;
  children: ReactNode;
}

export const RequireAuth = ({ children, redirectTo }: PropsRouter) => {
  const { isUserLogged } = useUser();
  return isUserLogged ? (children) : (<Navigate to={redirectTo} />);
}
