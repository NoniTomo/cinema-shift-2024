import { useEffect } from 'react';

import seancesByHalls from '@/utils/helpers/seancesByHalls';
import { getDateToString } from '@/utils/helpers/getDate';
import { useSeance } from '@/utils/context/Seance';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { Button } from '@/components/elements';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { getSchedule } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';

import styles from './index.module.scss';

export type ScheduleProps = {
  toForward?: () => void;
}

export const Schedule = (props: ScheduleProps) => {
  const { cinemaPayment, setSeance, setTickets } = useCinemaPayment();
  const { schedules, setSchedule } = useSeance();
  const { isMobile } = useMobileDetect();
  const params = useParams();

  const handleOnClick = () => {
    const filmId = params?.filmId;
    if (typeof filmId === 'string') {
      if (
        cinemaPayment.seance.date !== '' &&
        cinemaPayment.seance.time !== '' &&
        cinemaPayment.seance.hall !== ''
      ) {
        if (props?.toForward)
          props?.toForward();
      } else if (cinemaPayment.seance.date === '') {
        showError('Укажите дату киносеанса');
      } else {
        showError('Укажите время киносеанса');
      }
    }
  };

  useEffect(() => {
    setSeance({
      date: schedules instanceof Array ? schedules[0]?.date : '',
      time: '',
      hall: ''
    });
  }, [schedules]);

  const getScheduleQuery = useQuery(() => getSchedule({ params: { filmId: params.filmId! }, config: {} }), {
    select: (response) => {
      return response.data.schedules;
    },
    onSuccess: (schedules) => {
      setSchedule(schedules)
    },
    onError: (data) => {
      showError(data.message)
    }
  })

  if (getScheduleQuery.isLoading) return <Loading />

  return (
    <>
      <div className={`${styles.schedules}`}>
        {schedules && (
          <div className={`${styles['schedules__inner-wrapper']}`}>
            <div className={styles.schedules__date}>
              <div className={`${styles['date-group-buttons']}`}>
                {schedules.map((schedule) => (
                  <div
                    key={schedule?.date}
                    className={`${styles['date-group-buttons__button']} ${schedule?.date === cinemaPayment.seance?.date ? styles['date-group-buttons__button_active'] : ''}`}
                    onClick={() => setSeance({ date: schedule?.date, time: '', hall: '' })}
                  >
                    <p>{schedule?.date && getDateToString(schedule?.date)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.schedules__time}`}>
              {schedules.length > 0 &&
                cinemaPayment.seance.date !== '' &&
                seancesByHalls(
                  schedules.find((schedule) => cinemaPayment.seance.date === schedule?.date)
                    ?.seances as ScheduleSeance[]
                ).map((hall) => (
                  <div key={hall.name}>
                    <p className={styles[`schedules__hall-name`]}>{hall.name}</p>
                    <div className={`${styles['schedules__wrapper-chips']}`}>
                      {hall?.seances.map((seance) => (
                        <div
                          key={seance.time}
                          className={`${styles.chip} ${seance.time === cinemaPayment.seance.time && hall.name === cinemaPayment.seance.hall ? styles.chip_active : ''}`}
                          onClick={() => {
                            setSeance({
                              date: cinemaPayment.seance?.date,
                              time: seance.time,
                              hall: hall.name
                            });
                            setTickets([]);
                          }}
                        >
                          <p>{seance.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <Button variant='contained' onClick={handleOnClick}>
          Продолжить
        </Button>
      )}
    </>
  );
};
