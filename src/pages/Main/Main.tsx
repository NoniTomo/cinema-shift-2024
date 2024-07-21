import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { MovieSchedule, YourData, ChoiceOfSeats, MovieInfo, LayoutMediaQuery } from '@components/templates';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';
import {
  Modal,
  FilmCard,
  Schedule,
  SeatingMatrix,
  Header,
  UserDataForm
} from '@/components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getFilm } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';

import styles from './index.module.scss';

const getFilmInfo = (filmId: string) => getFilm({ params: { filmId }, config: {} });

export const Main = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const { isMobile } = useMobileDetect();
  const { setFilmId, setFilmName, cinemaPayment, setPerson } = useCinemaPayment();

  const getFilmInfoQuery = useQuery(() => getFilmInfo(params.filmId!), {
    keys: [params.filmId],
    select: (data) => {
      return data.data.film;
    },
    onSuccess: (data) => {
      setFilmId(params.filmId as string);
      setFilmName(data.name as string);
    },
    onError: (data) => {
      showError(data.message);
    }
  });

  const submitPerson = (data: CreatePaymentPersonDto) => {
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
        showError('Укажите дату киносеанса');
      } else if (cinemaPayment.seance.time === '') {
        showError('Укажите время киносеанса');
      }
    }
  };
  console.log('stage = ', stage)
  if (isMobile) {
    return (
      <>
        {stage === 1 && getFilmInfoQuery.data && (
          <MovieInfo film={getFilmInfoQuery.data} toForward={() => setStage(2)} />
        )}
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
        <LayoutMediaQuery>
          <Link className={styles.toback} to='/cinema/today'>
            <ArrowLeftIcon />
            <p className={styles.text}>Назад</p>
          </Link>
          {getFilmInfoQuery.data && (
            <FilmCard film={getFilmInfoQuery.data} description={true} direction='row' />
          )}
          <div>
            <p className={styles.title}>Расписание</p>
            <div style={{ width: '100%' }}>
              <Schedule />
            </div>
          </div>
          {cinemaPayment.seance.date !== '' &&
            cinemaPayment.seance.time !== '' &&
            cinemaPayment.seance.hall !== '' ? (
            <div className={styles['seating-matrix']}>
              <p className={styles.title}>Выбор места</p>
              <SeatingMatrix direction='row' onClick={onPayment} textButton='Купить' />
            </div>
          ) : (
            ''
          )}
        </LayoutMediaQuery>
        <Modal open={open} onClose={() => setOpen(false)}>
          <header className={styles['modal-header']}>Введите ваши данные</header>
          <UserDataForm buttonText='Продолжить' onSubmit={(data: CreatePaymentPersonDto) => submitPerson(data)} />
        </Modal>
      </>
    );
  }
};

/* 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { MovieSchedule, YourData, ChoiceOfSeats, MovieInfo } from '@components/templates';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';
import {
  Modal,
  FilmCard,
  Schedule,
  SeatingMatrix,
  Header,
  UserDataForm
} from '@/components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getFilm } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';

import styles from './index.module.scss';

const getFilmInfo = (filmId: string) => getFilm({ params: { filmId }, config: {} });

export const Main = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const { isMobile } = useMobileDetect();
  const { setFilmId, setFilmName, cinemaPayment, setPerson } = useCinemaPayment();

  const getFilmInfoQuery = useQuery(() => getFilmInfo(params.filmId!), {
    keys: [params.filmId],
    select: (data) => {
      return data.data.film;
    },
    onSuccess: (data) => {
      setFilmId(params.filmId as string);
      setFilmName(data.name as string);
    },
    onError: (data) => {
      showError(data.message);
    }
  });

  const submitPerson = (data: CreatePaymentPersonDto) => {
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
  console.log('stage = ', stage)
  if (isMobile) {
    return (
      <>
        {stage === 1 && getFilmInfoQuery.data && (
          <MovieInfo film={getFilmInfoQuery.data} toForward={() => setStage(2)} />
        )}
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
            {getFilmInfoQuery.data && (
              <FilmCard film={getFilmInfoQuery.data} description={true} direction='row' />
            )}
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
          <UserDataForm buttonText='Продолжить' onSubmit={(data: CreatePaymentPersonDto) => submitPerson(data)} />
        </Modal>
      </>
    );
  }
};
*/