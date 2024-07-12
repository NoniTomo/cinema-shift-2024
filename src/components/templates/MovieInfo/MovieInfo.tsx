import { ReactComponent as Cross } from '@assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import Header from '@components/modules/Header/Header';
import { IFilm } from '@/types/IFilm';
import FilmCard from '@components/modules/FilmCard/FilmCard';

import styles from './index.module.scss';

export type Props = {
  toForward: () => void;
  film: IFilm;
};

export const MovieInfo = ({ toForward, film }: Props) => {
  return (
    <>
      {film && (
        <>
          <Header to='/cinema/today' Icon={Cross} />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.afisha}`}>
              <div className={`${styles.movie}`} key={film?.id}>
                <FilmCard film={film} description={true} direction='column' />
              </div>
              <Button
                variant='contained'
                onClick={() => {
                  if (film) {
                    toForward();
                  }
                }}
              >
                Посмотреть расписание
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
