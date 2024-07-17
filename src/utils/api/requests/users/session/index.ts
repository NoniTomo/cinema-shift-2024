import { api } from '@/utils/api/instance';

export type GetSessionConfig = AxiosRequestConfig;

export const getSession = async (configRequest?: GetSessionConfig) => {
  return api.get<SessionResponse>('/users/session', configRequest?.config);
};
