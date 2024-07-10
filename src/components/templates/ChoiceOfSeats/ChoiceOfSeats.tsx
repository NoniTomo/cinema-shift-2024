import { useContext, useEffect, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

import { Button } from '../../elements/Button/Button';
import Header from '../../modules/Header/Header';
import { SeanceContext } from '../../../context/SeanceContext';
import { CinemaPaymentContext } from '../../../context/CinemaPaymentContext';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg';
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/svg/minus.svg';

import type { Ticket } from '../../../types/dto'

import styles from './index.module.scss';

function currentSeatsReducer(state: Ticket[], action: ActionSeatsSet | ActionSeatsDrop) {
  switch (action.type) {
    case 'set-seats': {
      return [ ...state, ...action.data ];
    }
    case 'drop-seat': {
      return state.filter(item => {
        console.log('action.data.row =', action.data.row , 'item.row=', item.row)
        console.log('action.data.seat =', action.data.column , 'item.seat=', item.column)
        return !(+action.data.row === +item.row && +action.data.column === +item.column);
      });
    }
    default: {
      return state;
    }
  }
}

type ActionSeatsSet = {
  type: 'set-seats',
  data: Ticket[]
}
type ActionSeatsDrop = {
  type: 'drop-seat',
  data: Ticket
}

export default function ChoiceOfSeats() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleGetSchedule, schedules, error } = useContext(SeanceContext);
  const { setTickets, cinemaPayment } = useContext(CinemaPaymentContext)

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

  const handleOnClick = () => {
    if (currentSeats.length > 0) {
      console.log('currentSeats = ', currentSeats)
      setTickets(currentSeats.map(seat => {return {
        row: `${seat.row}`,
        column: `${seat.column}`,
      }}));
      navigate(`../cinema/users/your-data`)
    } else {
      toast.error("Выберите места", {
        position: "top-left"
      });
    }
  }

  useEffect(() => {
    if (!schedules || schedules && schedules.length === 0) handleGetSchedule(+params.filmId!);
  }, [schedules])

  useEffect(() => {
    console.log('cinemaPayment.seance = ', cinemaPayment.seance)
    if (cinemaPayment.tickets.length && params.filmId === cinemaPayment.filmId) {
      dispatchCurrentSeats({
        type: 'set-seats',
        data: cinemaPayment.tickets, 
      })
    }
  }, [cinemaPayment])

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
                            {row.map((column, columnIndex) => {
                              const type = (column.type === 'ECONOM') 
                                ? 'seat_econom' 
                                : (column.type === 'BLOCKED') 
                                ? 'seat_blocked' 
                                : 'seat_comfort'
                                
                              return <div 
                                key={columnIndex} 
                                className={`${styles['seat']} 
                                  ${styles[type]}
                                  ${currentSeats.find(item => (item.row === `${rowIndex}` && item.column === `${columnIndex}`)) && styles[`${type + '_active'}`]}
                                `}
                                onClick={() => (column.type !== 'BLOCKED') 
                                  && (currentSeats.find(item => item.row === `${rowIndex}` && item.column === `${columnIndex}`))
                                  ? dispatchCurrentSeats({
                                      type: 'drop-seat',
                                      data: {
                                        row: `${rowIndex}`,
                                        column: `${columnIndex}`
                                      }
                                    })
                                  : dispatchCurrentSeats({
                                    type: 'set-seats',
                                    data: [{
                                      row: `${rowIndex}`,
                                      column: `${columnIndex}`
                                    }]
                                  })
                                }>
                                  {currentSeats.find(item => item.row === `${rowIndex}` && item.column ===`${ columnIndex}`) && <p className={styles['seat__seat-index']}>{columnIndex + 1}</p>}
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
            <Button variant='contained' onClick={handleOnClick}>Продолжить</Button>
          </div>
        </div>
      </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
      <ToastContainer />
    </>
  )
}
/* 
function currentSeatsReducer(state: CurrentSeatsType[], action: ActionCurrentSeats) {
  switch (action.type) {
    case 'set-seat': {
      return [ ...state, action.data ];
    }
    case 'drop-seat': {
      return state.filter(item => {
        console.log('action.data.row =', action.data.row , 'item.row=', item.row)
        console.log('action.data.seat =', action.data.column , 'item.seat=', item.column)
        return !(+action.data.row === +item.row && +action.data.column === +item.column);
      });
    }
    default: {
      return state;
    }
  }
}
type CurrentSeatsType = {
  row: number;
  column: number;
}
type ActionCurrentSeats = {
  type: 'set-seat' | 'drop-seat',
  data: CurrentSeatsType
}
export default function ChoiceOfSeats() {
  const params = useParams();
  const navigate = useNavigate();

  const { handleGetSchedule, schedules, error } = useContext(SeanceContext);
  const { setTickets } = useContext(CinemaPaymentContext)

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

  const handleOnClick = () => {
    const filmId = params?.filmId;
    if (typeof filmId === "string") {
      if (currentSeats.length > 0) {
        console.log('currentSeats = ', currentSeats)
        setTickets(currentSeats.map(seat => {return {
          row: `${seat.row}`,
          column: `${seat.column}`,
        }}));
        navigate(`../cinema/users/your-data`)
      } else {
        toast.error("Выберите места", {
          position: "top-left"
        });
      }
    }
  }

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
                        {schedules[0]?.seances[0].hall.places.map((row, rowIndex) => (
                          <div key={rowIndex} className={styles['row']}>
                            <p className={styles['row__number']}>{rowIndex + 1}</p>
                            {row.map((column, columnIndex) => {
                              const type = (column.type === 'ECONOM') 
                                ? 'seat_econom' 
                                : (column.type === 'BLOCKED') 
                                ? 'seat_blocked' 
                                : 'seat_comfort'
                                
                              return <button 
                                key={columnIndex} 
                                className={`${styles['seat']} 
                                  ${styles[type]}
                                  ${currentSeats.find(item => (item.row === rowIndex && item.column === columnIndex)) && styles[`${type + '_active'}`]}
                                `}
                                onClick={() => (column.type !== 'BLOCKED') && dispatchCurrentSeats({
                                  type: (currentSeats.find(item => item.row === rowIndex && item.column === columnIndex)) ? 'drop-seat' : 'set-seat',
                                  data: {
                                    row: rowIndex,
                                    column: columnIndex
                                  }
                                })}>
                                  {currentSeats.find(item => item.row === rowIndex && item.column === columnIndex) && <p className={styles['seat__seat-index']}>{columnIndex + 1}</p>}
                                </button>
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
            <Button variant='contained' onClick={handleOnClick}>Продолжить</Button>
          </div>
        </div>
      </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
      <ToastContainer />
    </>
  )
} */