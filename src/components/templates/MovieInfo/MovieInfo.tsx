import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import config from '../../../config';
import { ReactComponent as Cross } from '../../../assets/svg/Cross.svg';

import { Button } from '../../elements/Button/Button';
import Header from '../../modules/Header/Header';
import getAgeRating from '../../../utils/getAgeRating';
import { IFilm } from "../../../types/IFilm";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@components/elements/Rating/Rating';

export default function MovieInfo() {
  const [film, setFilm] = useState<IFilm>();
  const [error, setError] = useState(false);
  const [visibleDescription, setVisibleDescription] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    axios.get(`${config.PUBLIC_SERVER_URL}/cinema/film/${params.filmId}`)
    .then((res) =>{
      if(res.data?.success) {
        console.error('res.data?.success = ', res.data?.success)
        setFilm(res.data.film as IFilm);
      } else console.error('res.data?.success = ', res.data?.success)
    })
    .catch(() =>{
      setError(true);
    })
  }, [params.filmId])

  function filmDescription(description: string): JSX.Element {
    if(description.split(' ').length >= 10) {
      if (!visibleDescription) {
        return (
          <>
            {description.split(' ').slice(0, 11).join(' ') + '...'}
            <button className={`${styles.movie__description_button}`} onClick={() => setVisibleDescription(true)}>раскрыть</button>
          </>
        )
      } else {
        return (
          <>
            {description}
            <button className={`${styles.movie__description_button}`} onClick={() => setVisibleDescription(false)}>свернуть</button>
          </>
        )
      }
    } else {
      return (<>{description}</>)
    }
  }

  return (
    <>
    {(!error && film) ? (
      <>
        <Header to='/cinema/today' Icon={Cross}/>
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.afisha}`}>
            <div className={`${styles.movie}`} key={film?.id}>
              <div className={`${styles.poster}`}>
                <div className={`${styles.poster__info}`}>
                  <p className={`${styles.poster__text_bold}`}>{film?.genres[0]}</p>
                  <p className={`${styles.poster__text}`}>{film?.country.name}, {film?.releaseDate}</p>
                </div>
                <img className={`${styles.poster__img}`} src={`${config.PUBLIC_SERVER_URL}${film?.img}`} />
              </div>
              <h3 className={`${styles.movie__title}`}>{`${film?.name} (${getAgeRating(film?.ageRating)})`}</h3>
              <p className={`${styles.movie__subtitle}`}>{film?.originalName}</p>
              <Rating ratingSource={[
                { name: 'Kinopoisk', estimate: film.userRatings.kinopoisk}, 
                { name: 'IMDB', estimate: film.userRatings.imdb }
              ]}/>
              <p className={`${styles.movie__description}`}>{filmDescription(film?.description)}</p>
            </div>
            <Button variant='contained' onClick={() => navigate(`/cinema/film/${film?.id}/schedule`)}>Посмотреть расписание</Button>
          </div>
        </div>
      </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  )
}