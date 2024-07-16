import { UpdateProfileDto } from '@/utils/types';
import { api } from '@/utils/api/instance';

export type GetProfileConfig = AxiosRequestConfig<UpdateProfileDto>;

export const patchProfile = async ({ params, config }: AxiosRequestConfig) => {
  return api.patch('/users/profile', params, config);
};
