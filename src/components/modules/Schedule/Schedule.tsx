import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import seancesByHalls from '@/utils/seancesByHalls';
import ISeance from '@/types/ISeance';
import { getDateToString } from '@/utils/getDate';
import { SeanceContext } from '@/context/SeanceContext';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { Loading } from '@components/modules/Loading/Loading';

import styles from './index.module.scss';

export default function Schedule() {
  const params = useParams();
  const { schedules, handleGetSchedule, loading } = useContext(SeanceContext);
  const { cinemaPayment, setSeance, setTickets } = useContext(CinemaPaymentContext);

  useEffect(() => {
    handleGetSchedule(+params.filmId!);
  }, []);

  useEffect(() => {
    setSeance({
      date: schedules instanceof Array ? schedules[0]?.date : '',
      time: '',
      hall: ''
    });
  }, [schedules]);

  if (loading) return <Loading />;

  return (
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
                  ?.seances as ISeance[]
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
  );
}
