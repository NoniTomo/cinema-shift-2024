import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as Cross } from '../../../assets/svg/Cross.svg';
import { Button } from '../../elements/Button/Button';
import Header from '../../modules/Header/Header';
import { IFilm } from '../../../types/IFilm';
import FilmCard from '../../modules/FilmCard/FilmCard';

import config from '../../../config';

import styles from './index.module.scss';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';

export default function MovieInfo() {
  const { SetFilmName } = useContext(CinemaPaymentContext);
  const [film, setFilm] = useState<IFilm>();
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    axios
      .get(`${config.PUBLIC_SERVER_URL}/cinema/film/${params.filmId}`)
      .then((res) => {
        if (res.data?.success) {
          console.error('res.data?.success = ', res.data?.success);
          setFilm(res.data.film as IFilm);
        } else console.error('res.data?.success = ', res.data?.success);
      })
      .catch(() => {
        setError(true);
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
      {!error && film ? (
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
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  );
}
