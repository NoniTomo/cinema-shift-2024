import { useContext, useEffect, useReducer } from 'react';
import { Button } from '../../elements/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';

import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg';
import { HallContext } from '../../../context/HallContext';
import styles from './index.module.scss';
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/svg/minus.svg';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

function currentSeatsReducer(state: CurrentSeatsType[], action: ActionCurrentSeats) {
  switch (action.type) {
    case 'set-seat': {
      return [ ...state, action.data ];
    }
    case 'drop-seat': {
      return state.filter(item => {
        console.log('action.data.row =', action.data.row , 'item.row=', item.row)
        console.log('action.data.seat =', action.data.seat , 'item.seat=', item.seat)
        return !(+action.data.row === +item.row && +action.data.seat === +item.seat);
      });
    }
    default: {
      return state;
    }
  }
}
type CurrentSeatsType = {
  row: number;
  seat: number;
}
type ActionCurrentSeats = {
  type: 'set-seat' | 'drop-seat',
  data: CurrentSeatsType
}
export default function ChoiceOfSeats() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleGetSchedule, schedules, error } = useContext(HallContext);
  const [currentSeats, dispatchCurrentSeats] = useReducer(currentSeatsReducer, []);
  const Controls = () => {
    const { zoomIn, zoomOut } = useControls();
    return (
      <>
        <button onClick={() => zoomIn()} className={styles.zoom__plus}><PlusIcon/></button>
        <button onClick={() => zoomOut()} className={styles.zoom__minus}><MinusIcon/></button>
      </>
    );
  };

  useEffect(() => {
    if (!schedules || schedules && schedules.length === 0) handleGetSchedule(+params.filmId!);
  }, [schedules])

  return (
    <>
    {(!error && schedules) ? (
      <>
        <Header to={`/cinema/film/${params.filmId}/schedule`} Icon={ArrowLeftIcon} text='Выбор места' />
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.schema}`}>
            <div>
              <div className={styles.screen}>
                <p className={styles['screen__screen-text']}>Экран</p>
                <div className={styles['screen__screen-schema']}/>
              </div>
              
              <div className={styles.hall}>
                <p>Ряд</p>
                <TransformWrapper>
                  <div className={styles['hall__matrix-seats']}>
                    <TransformComponent>
                      <div className={styles['hall__seats-schema']}>
                        {schedules[0]?.seances && schedules[0].seances[0].hall.places.map((row, rowIndex) => (
                          <div key={rowIndex} className={styles['row']}>
                            <p className={styles['row__number']}>{rowIndex + 1}</p>
                            {row.map((seat, seatIndex) => {
                              const type = (seat.type === 'ECONOM') 
                                ? 'seat_econom' 
                                : (seat.type === 'BLOCKED') 
                                ? 'seat_blocked' 
                                : 'seat_comfort'
                                
                              return <div 
                                key={seatIndex} 
                                className={`${styles['seat']} 
                                  ${styles[type]}
                                  ${currentSeats.find(item => (item.row === rowIndex && item.seat === seatIndex)) && styles[`${type + '_active'}`]}
                                `}
                                onClick={() => (seat.type !== 'BLOCKED') && dispatchCurrentSeats({
                                  type: (currentSeats.find(item => item.row === rowIndex && item.seat === seatIndex)) ? 'drop-seat' : 'set-seat',
                                  data: {
                                    row: rowIndex,
                                    seat: seatIndex
                                  }
                                })}>
                                  {currentSeats.find(item => item.row === rowIndex && item.seat === seatIndex) && <p className={styles['seat__seat-index']}>{seatIndex + 1}</p>}
                                </div>
                            })}
                          </div>
                        ))}
                      </div>
                    </TransformComponent>
                    
                    <div className={styles.zoom}>
                      <Controls />
                    </div>
                  </div>
                </TransformWrapper>
              </div>
            </div>
            <Button variant='contained' onClick={() => navigate(`/cinema/users/signin`)}>Продолжить</Button>
          </div>
        </div>
      </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  )
}