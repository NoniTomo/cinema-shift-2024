import { useContext, useEffect, useState } from 'react';
import { Button } from '../../elements/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import seancesByHalls from '../../../utils/seancesByHalls';
import ISeance from '../../../types/ISeance';
import styles from './index.module.scss';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg';
import { HallContext } from '../../../context/HallContext';

export default function MovieSchedule() {
  const params = useParams();

  const { handleGetSchedule, schedules, error, loading } = useContext(HallContext);

  useEffect(() => {
    handleGetSchedule(+params.filmId!);
  }, [])

  useEffect(() => {
    setCurrentTime({ date: (schedules instanceof Array) ? schedules[0]?.date : '', time: '', hall: ''});
  }, [schedules])
  
  const [currentTime, setCurrentTime] = useState({
    date: '',
    time: '',
    hall: ''
  });
  const navigate = useNavigate();
  const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const month: string[] = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  
  return (
    <>
    {(!error && schedules && !loading) ? (
      <>
        <Header to={`/cinema/film/${params.filmId}`} Icon={ArrowLeftIcon} text='Расписание' />
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.schedules}`}>
            <div className={`${styles['schedules__inner-wrapper']}`}>
              <div className={styles.schedules__date}>
                <div className={`${styles['date-group-buttons']}`}>
                  {schedules.map((schedule) => {
                    const currentYear: number = 2000 + +schedule?.date.split('.')[2]; 
                    const currentMonth: number = +schedule?.date.split('.')[1] - 1; 
                    const currentDay: number = +schedule?.date.split('.')[0]; 

                    const date = new Date(currentYear, currentMonth, currentDay); 
                    return (
                      <div 
                        key={schedule?.date} 
                        className={`${styles['date-group-buttons__button']} ${(schedule?.date === currentTime?.date) ? styles['date-group-buttons__button_active'] : ''}`}
                        onClick={() => setCurrentTime({ date: schedule?.date, time: '', hall: ''})}
                      >
                        <p>{days[date.getDay()]}, {currentDay} {month[date.getMonth()]}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={`${styles.schedules__time}`}>
                {
                  schedules.length > 0 && currentTime.date !== '' && seancesByHalls(schedules.find((schedule) => currentTime.date === schedule?.date)?.seances as ISeance[])
                    .map((hall) => (
                      <>
                        <p className={styles[`schedules__hall-name`]}>{hall.name}</p>
                        <div className={`${styles['schedules__wrapper-chips']}`}>
                          {
                            hall?.seances.map((seance) => (
                              <div key={seance.time} className={`${styles.chip} ${(seance.time === currentTime.time && hall.name === currentTime.hall) && styles.chip_active}`} onClick={() => setCurrentTime({ date: currentTime?.date, time: seance.time, hall: hall.name})}>
                                <p>{seance.time}</p>
                              </div>
                            ))
                          }
                        </div>
                      </>
                    ))
                }
              </div>
            </div>
            <Button variant='contained' onClick={() => navigate(`/cinema/film/${params.filmId}/schedule/choose-seat`)}>Продолжить</Button>
          </div>
        </div>
      </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  )
}