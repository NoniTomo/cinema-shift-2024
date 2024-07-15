import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IFilm } from '@/utils/types/IFilm';
import config from '@/config';
import { Button } from '@components/elements';
import { RequestClient } from '@/utils/axiosAPI';
import { Loading, FilmCard, Header, Footer } from '@/components/modules';

import styles from './index.module.scss';

export const Afisha = () => {
  const [films, setFilms] = useState<IFilm[]>();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    RequestClient.get(`${config.PUBLIC_SERVER_URL}/cinema/today`)
      .then((res) => {
        if (res.data?.success) {
          console.error('res.data?.success = ', res.data?.success);
          if (res.data.films instanceof Array) setFilms(res.data.films as IFilm[]);
          else console.error('res.data.films instanceof Array = ', res.data.films instanceof Array);
        } else console.error('res.data?.success = ', res.data?.success);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header text='Афиша' />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.afisha}`}>
          {loading ? (
            <Loading />
          ) : (
            films?.map((item: IFilm) => (
              <div className={`${styles.movie}`} key={item.id}>
                <FilmCard film={item} />
                <Button variant='contained' onClick={() => navigate(`../cinema/film/${item.id}`)}>
                  Подробнее
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
