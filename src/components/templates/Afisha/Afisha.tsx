import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IFilm } from '../../../types/IFilm'
import config from '../../../config'
import { Button } from '../../elements/Button/Button'
import Header from '../../modules/Header/Header'
import Footer from '../../modules/Footer/Footer'
import FilmCard from '../../modules/FilmCard/FilmCard'

import styles from './index.module.scss'

export default function Afisha() {
  const [films, setFilms] = useState<IFilm[]>()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${config.PUBLIC_SERVER_URL}/cinema/today`)
      .then((res) => {
        if (res.data?.success) {
          console.error('res.data?.success = ', res.data?.success)
          if (res.data.films instanceof Array)
            setFilms(res.data.films as IFilm[])
          else
            console.error(
              'res.data.films instanceof Array = ',
              res.data.films instanceof Array
            )
        } else console.error('res.data?.success = ', res.data?.success)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Header text="Афиша" />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.afisha}`}>
          {films &&
            films.map((item: IFilm) => (
              <div className={`${styles.movie}`} key={item.id}>
                <FilmCard film={item} />
                <Button
                  variant="contained"
                  onClick={() => navigate(`../cinema/film/${item.id}`)}
                >
                  Подробнее
                </Button>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
