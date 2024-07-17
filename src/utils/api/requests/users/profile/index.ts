import { UpdateProfileDto } from '@/utils/types';
import { api } from '@/utils/api/instance';

export type PatchProfileParams = UpdateProfileDto;
export type PatchProfileConfig = AxiosRequestConfig<PatchProfileParams>;

export const patchProfile = async ({ params, config }: PatchProfileConfig) => {
  return api.patch<UpdateProfileResponse>('/users/profile', params, config);
};
