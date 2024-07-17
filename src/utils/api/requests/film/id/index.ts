import { api } from "@/utils/api/instance"

export type GetFilmParams = { filmId: string };
export type GetFilmConfig = AxiosRequestConfig<GetFilmParams>;

export const getFilm = async ({ params, config }: GetFilmConfig) => {
  return api.get<FilmResponse>(`/cinema/film/${params.filmId}`, config);
}