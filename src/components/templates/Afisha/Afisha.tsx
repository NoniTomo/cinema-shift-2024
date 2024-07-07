import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import config from '../../../config';
import { Button } from '../../elements/Button/Button';
import Header from '../../modules/Header/Header';
import { IFilm } from "../../../types/IFilm";
import Footer from '../../modules/Footer/Footer';
import getAgeRating from '../../../utils/getAgeRating';
import Rating from '../../elements/Rating/Rating';
import styles from './index.module.scss';
 
export default function Afisha() {
  const [films, setFilms] = useState<IFilm[]>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.PUBLIC_SERVER_URL}/cinema/today`)
    .then((res) =>{
      if(res.data?.success) {
        console.error('res.data?.success = ', res.data?.success)
        if (res.data.films instanceof Array) setFilms(res.data.films as IFilm[]);
        else console.error('res.data.films instanceof Array = ', res.data.films instanceof Array)
      } else console.error('res.data?.success = ', res.data?.success)
    })
    .catch((error) =>{
      console.log(error);
    })
  }, [])

  return (
    <>
      <Header text='Афиша'/>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.afisha}`}>
          {films && films.map((item: IFilm) => (
            <div className={`${styles.movie}`} key={item.id}>
              <div className={`${styles['movie-info']}`}>
                <div className={`${styles.poster}`}>
                  <div className={`${styles.poster__info}`}>
                    <p className={`${styles.poster__text_bold}`}>{item.genres[0]}</p>
                    <p className={`${styles.poster__text}`}>{item.country.name}, {item.releaseDate}</p>
                  </div>
                  <img className={`${styles.poster__img}`} src={`${config.PUBLIC_SERVER_URL}${item.img}`} />
                </div>
                <h3 className={`${styles['movie-info__title']}`}>{`${item.name} (${getAgeRating(item.ageRating)})`}</h3>
                <p className={`${styles['movie-info__subtitle']}`}>{item.originalName}</p>
                <Rating ratingSource={[
                  { name: 'Kinopoisk', estimate: item.userRatings.kinopoisk}, 
                  { name: 'IMDB', estimate: item.userRatings.imdb }
                ]}/>
              </div>
              <Button variant='contained' onClick={() => navigate(`../cinema/film/${item.id}`)}>Подробнее</Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}