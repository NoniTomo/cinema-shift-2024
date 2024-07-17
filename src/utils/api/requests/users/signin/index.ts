import { api } from '@/utils/api/instance';

export type PostSignInParams = SignInDto;
export type PostSignInConfig = AxiosRequestConfig<PostSignInParams>;


export const postSignIn = async ({ params, config }: PostSignInConfig) => {
  return api.post<SignInResponse>('/users/signin', params, config);
};
