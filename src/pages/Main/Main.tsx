import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MovieSchedule, YourData, ChoiceOfSeats, MovieInfo } from '@components/templates';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';
import { IFilm, Profile } from '@/utils/types';
import { RequestClient } from '@/utils/axiosAPI';
import {
  Modal,
  FilmCard,
  Schedule,
  SeatingMatrix,
  Header,
  UserDataForm
} from '@/components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import {} from '@/utils/types/dto';

import styles from './index.module.scss';
import { useUser } from '@/utils/context/User';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

export const Main = () => {
  const [open, setOpen] = useState(false);
  const { isUserLogged } = useUser();
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const { isMobile } = useMobileDetect();
  const { setFilmId, setFilmName, cinemaPayment, setPerson } = useCinemaPayment();
  const [film, setFilm] = useState<IFilm>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  useEffect(() => {
    RequestClient.get(`/cinema/film/${params.filmId}`)
      .then((res) => {
        if (res.data?.success) {
          console.error('res.data?.success = ', res.data?.success);
          setFilm(res.data.film as IFilm);
          setFilmId(params.filmId as string);
          setFilmName(res.data.film.name as string);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.filmId, setFilmId, setFilmName]);

  const submitPerson = (data: Profile) => {
    setPerson(data);
    navigate('../cinema/payment');
  };

  const onPayment = () => {
    const filmId = params?.filmId;
    if (typeof filmId === 'string') {
      if (
        cinemaPayment.seance.date !== '' &&
        cinemaPayment.seance.time !== '' &&
        cinemaPayment.seance.hall !== '' &&
        cinemaPayment.tickets.length > 0
      ) {
        setStage(4);
        setOpen(true);
      } else if (cinemaPayment.seance.date === '') {
        toast.error('Укажите дату киносеанса', {
          position: 'top-left'
        });
      } else if (cinemaPayment.seance.time === '') {
        toast.error('Укажите время киносеанса', {
          position: 'top-left'
        });
      }
    }
  };
  console.log(cinemaPayment);
  if (isMobile) {
    return (
      <>
        {stage === 1 && film && <MovieInfo film={film} toForward={() => setStage(2)} />}
        {stage === 2 && <MovieSchedule toBack={() => setStage(1)} toForward={() => setStage(3)} />}
        {stage === 3 && <ChoiceOfSeats toBack={() => setStage(2)} toForward={() => setStage(4)} />}
        {stage === 4 && (
          <YourData toBack={() => setStage(3)} toForward={() => navigate('../cinema/payment')} />
        )}
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Link className={styles.toback} to='/cinema/today'>
              <ArrowLeftIcon />
              <p className={styles.text}>Назад</p>
            </Link>
            {film && <FilmCard film={film} description={true} direction='row' />}
            <div>
              <p className={styles.title}>Расписание</p>
              <div style={{ width: '100%' }}>
                <Schedule />
              </div>
            </div>
            {cinemaPayment.seance.date !== '' &&
            cinemaPayment.seance.time !== '' &&
            cinemaPayment.seance.hall !== '' ? (
              <div>
                <p className={styles.title}>Выбор места</p>
                <SeatingMatrix direction='row' onClick={onPayment} textButton='Купить' />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <header className={styles['modal-header']}>Введите ваши данные</header>
          <UserDataForm buttonText='Продолжить' onSubmit={(data: Profile) => submitPerson(data)} />
        </Modal>
      </>
    );
  }
};
