import { useState } from 'react'
import config from '../../../config'
import { IFilm } from '../../../types/IFilm'
import getAgeRating from '../../../utils/getAgeRating'
import Rating from '../../elements/Rating/Rating'
import styles from './index.module.scss'

export type FilmCardType = {
  film: IFilm
  direction?: 'column' | 'row'
  description?: boolean
}

export default function FilmCard({
  film,
  direction = 'column',
  description = false,
}: FilmCardType) {
  const [visibleDescription, setVisibleDescription] = useState(false)

  function filmDescription(description: string): JSX.Element {
    if (description.split(' ').length >= 10) {
      if (!visibleDescription) {
        return (
          <>
            {description.split(' ').slice(0, 11).join(' ') + '...'}
            <button
              className={`${styles.movie__description_button}`}
              onClick={() => setVisibleDescription(true)}
            >
              раскрыть
            </button>
          </>
        )
      } else {
        return (
          <>
            {description}
            <button
              className={`${styles.movie__description_button}`}
              onClick={() => setVisibleDescription(false)}
            >
              свернуть
            </button>
          </>
        )
      }
    } else {
      return <>{description}</>
    }
  }

  return (
    <div className={styles[`movie_${direction}`]}>
      <div className={`${styles['movie-info']}`}>
        <div className={`${styles.poster}`}>
          <div className={`${styles.poster__info}`}>
            <p className={`${styles.poster__text_bold}`}>{film.genres[0]}</p>
            <p className={`${styles.poster__text}`}>
              {film.country.name}, {film.releaseDate}
            </p>
          </div>
          <img
            className={`${styles.poster__img}`}
            src={`${config.PUBLIC_SERVER_URL}${film.img}`}
          />
        </div>
        <h3
          className={`${styles['movie-info__title']}`}
        >{`${film.name} (${getAgeRating(film.ageRating)})`}</h3>
        <p className={`${styles['movie-info__subtitle']}`}>
          {film.originalName}
        </p>
        <Rating
          ratingSource={[
            { name: 'Kinopoisk', estimate: film.userRatings.kinopoisk },
            { name: 'IMDB', estimate: film.userRatings.imdb },
          ]}
        />
        {description && (
          <p className={`${styles.movie__description}`}>
            {filmDescription(film?.description)}
          </p>
        )}
      </div>
    </div>
  )
}
