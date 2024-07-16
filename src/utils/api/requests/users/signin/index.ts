import { AxiosRequestConfig } from 'axios';
import { SignInDto } from '@/utils/types';
import { api } from '@/utils/api/instance';

export const postSignIn = async (configRequest: AxiosRequestConfig<SignInDto>) => {
  return api.post('/users/signin', configRequest);
};
