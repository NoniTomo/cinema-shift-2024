import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/elements';
import { getToday } from '@/utils/api/requests';
import { Loading, FilmCard, Header, Footer } from '@/components/modules';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { showError } from '@/utils/helpers';

import styles from './index.module.scss';

export const Afisha = () => {
  const [films, setFilms] = useState<Film[]>();
  const navigate = useNavigate();

  const getTodayQuery = useQuery(() => getToday({}), {
    select: (response) => {
      return response.data.films;
    },
    onSuccess: (data) => {
      setFilms(data)
    },
    onError: (data) => {
      showError(data.message);
    }
  });

  return (
    <>
      <Header text='Афиша' />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.afisha}`}>
          {getTodayQuery.isLoading ? (
            <Loading />
          ) : (
            films?.map((film) => (
              <div className={`${styles.movie}`} key={film.id}>
                <FilmCard film={film} />
                <Button variant='contained' onClick={() => navigate(`../cinema/film/${film.id}`)}>
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
