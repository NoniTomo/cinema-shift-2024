import { ReactComponent as Cross } from '@assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import { Header, FilmCard } from '@components/modules';
import { LayoutMobile } from '../LayoutMobile/LayoutMobile';

import styles from './index.module.scss';

export type MovieInfoProps = {
  toForward: () => void;
  film: Film;
};

export const MovieInfo = ({ toForward, film }: MovieInfoProps) => {
  return (
    <>
      {film && (
        <>
          <Header to='/cinema/today' Icon={Cross} />
          <LayoutMobile>

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
          </LayoutMobile>
        </>
      )}
    </>
  );
};
