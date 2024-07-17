import { api } from "../../instance"

export const getToday = async (requestConfig: AxiosRequestConfig) => {
  return api.get<FilmsResponse>('/cinema/today', requestConfig.config);
}