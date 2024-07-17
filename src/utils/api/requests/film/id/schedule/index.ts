import { api } from "@/utils/api/instance"

export type GetScheduleParams = { filmId: string };
export type GetScheduleConfig = AxiosRequestConfig<GetScheduleParams>;

export const getSchedule = async ({ params, config }: GetScheduleConfig) => {
  return api.get<ScheduleResponse>(`/cinema/film/${params.filmId}/schedule`, config);
}