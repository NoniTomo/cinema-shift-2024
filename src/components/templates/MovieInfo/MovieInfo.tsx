import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { ReactComponent as Cross } from '@assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import Header from '@components/modules/Header/Header';
import { IFilm } from '@/types/IFilm';
import FilmCard from '@components/modules/FilmCard/FilmCard';

import config from '@/config';

import styles from './index.module.scss';
import { RequestClient } from '@/utils/axiosAPI';

export default function MovieInfo() {
  const { SetFilmName } = useContext(CinemaPaymentContext);
  const [film, setFilm] = useState<IFilm>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    RequestClient.get(`${config.PUBLIC_SERVER_URL}/cinema/film/${params.filmId}`)
      .then((res) => {
        if (res.data?.success) {
          console.error('res.data?.success = ', res.data?.success);
          setFilm(res.data.film as IFilm);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.filmId]);

  const onClick = () => {
    if (film) {
      SetFilmName(film?.name);
      navigate(`/cinema/film/${film?.id}/schedule`);
    }
  };

  return (
    <>
      {film && (
        <>
          <Header to='/cinema/today' Icon={Cross} />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.afisha}`}>
              <div className={`${styles.movie}`} key={film?.id}>
                <FilmCard film={film} description={true} />
              </div>
              <Button variant='contained' onClick={onClick}>
                Посмотреть расписание
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
