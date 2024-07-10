import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@components/elements/Button/Button';
import Header from '@components/modules/Header/Header';
import seancesByHalls from '@/utils/seancesByHalls';
import ISeance from '@/types/ISeance';
import { SeanceContext } from '@/context/SeanceContext';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import styles from './index.module.scss';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { getDateToString } from '@/utils/getDate';
import { Loading } from '@/components/modules/Loading/Loading';

export default function MovieSchedule() {
  const params = useParams();

  const { handleGetSchedule, schedules, loading } = useContext(SeanceContext);
  const { cinemaPayment, setFilmId, setSeance } = useContext(CinemaPaymentContext);

  const handleOnClick = () => {
    const filmId = params?.filmId;
    if (typeof filmId === 'string') {
      if (currentTime.date !== '' && currentTime.time !== '' && currentTime.hall !== '') {
        setFilmId(filmId);

        setSeance({
          date: currentTime.date,
          time: currentTime.time,
          hall: currentTime.hall
        });
        navigate(`/cinema/film/${filmId}/schedule/choose-seat`);
      } else if (currentTime.date === '') {
        toast.error('Укажите дату киносеанса', {
          position: 'top-left'
        });
      } else {
        toast.error('Укажите время киносеанса', {
          position: 'top-left'
        });
      }
    }
  };

  useEffect(() => {
    handleGetSchedule(+params.filmId!);
  }, []);

  useEffect(() => {
    if (
      params?.filmId === cinemaPayment.filmId &&
      cinemaPayment.seance.date !== '' &&
      cinemaPayment.seance.time !== '' &&
      cinemaPayment.seance.hall !== ''
    ) {
      setCurrentTime({
        date: cinemaPayment.seance.date,
        time: cinemaPayment.seance.time,
        hall: cinemaPayment.seance.hall
      });
    } else {
      setCurrentTime({
        date: schedules instanceof Array ? schedules[0]?.date : '',
        time: '',
        hall: ''
      });
    }
  }, [schedules, cinemaPayment]);

  const [currentTime, setCurrentTime] = useState({
    date: '',
    time: '',
    hall: ''
  });
  const navigate = useNavigate();

  if (loading) return <Loading />;

  return (
    <>
      {schedules && (
        <>
          <Header to={`/cinema/film/${params.filmId}`} Icon={ArrowLeftIcon} text='Расписание' />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.schedules}`}>
              <div className={`${styles['schedules__inner-wrapper']}`}>
                <div className={styles.schedules__date}>
                  <div className={`${styles['date-group-buttons']}`}>
                    {schedules.map((schedule) => (
                      <div
                        key={schedule?.date}
                        className={`${styles['date-group-buttons__button']} ${schedule?.date === currentTime?.date ? styles['date-group-buttons__button_active'] : ''}`}
                        onClick={() => setCurrentTime({ date: schedule?.date, time: '', hall: '' })}
                      >
                        <p>{schedule?.date && getDateToString(schedule?.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${styles.schedules__time}`}>
                  {schedules.length > 0 &&
                    currentTime.date !== '' &&
                    seancesByHalls(
                      schedules.find((schedule) => currentTime.date === schedule?.date)
                        ?.seances as ISeance[]
                    ).map((hall) => (
                      <>
                        <p className={styles[`schedules__hall-name`]}>{hall.name}</p>
                        <div className={`${styles['schedules__wrapper-chips']}`}>
                          {hall?.seances.map((seance) => (
                            <div
                              key={seance.time}
                              className={`${styles.chip} ${seance.time === currentTime.time && hall.name === currentTime.hall && styles.chip_active}`}
                              onClick={() =>
                                setCurrentTime({
                                  date: currentTime?.date,
                                  time: seance.time,
                                  hall: hall.name
                                })
                              }
                            >
                              <p>{seance.time}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <Button variant='contained' onClick={handleOnClick}>
                Продолжить
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
