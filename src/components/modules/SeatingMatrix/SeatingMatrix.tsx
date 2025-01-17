import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { Controls } from '@components/modules/Controls/Controls';
import { getSeats } from '@/utils/helpers/getSeats';
import { Button } from '@/components/elements/Button/Button';
import { useSeance } from '@/utils/context/Seance';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

import styles from './index.module.scss';

export type SeatingMatrixProps = {
  direction?: 'row' | 'column';
  onClick?: () => void;
  textButton?: string;
};

export const SeatingMatrix = ({
  direction = 'column',
  onClick,
  textButton = 'Продолжить'
}: SeatingMatrixProps) => {
  const { schedules } = useSeance();
  const { setAddTicket, setDropTicket, setTickets, cinemaPayment } = useCinemaPayment();

  const getHall = (hall: string) => {
    switch (hall) {
      case 'Красный зал':
        return 'Red';
      case 'Синий зал':
        return 'Blue';
      case 'Зеленый зал':
        return 'Green';
      default:
        return hall;
    }
  };

  useEffect(() => {
    setTickets([]);
  }, []);

  const schedulesLocal =
    schedules && schedules.length > 0
      ? schedules.find((item) => item?.date === cinemaPayment.seance.date)
      : undefined;

  const seanceLocal = schedulesLocal
    ? schedulesLocal?.seances.find((item) => {
      return (
        item.time === cinemaPayment.seance.time &&
        getHall(cinemaPayment.seance.hall) === item.hall.name
      );
    })
    : undefined;

  return (
    <div className={styles[`schema_${direction}`]}>
      {schedules && (
        <div className={styles.schema__container}>
          <div className={styles.screen}>
            <p className={styles['screen__screen-text']}>Экран</p>
            <div className={styles['screen__screen-schema']} />
          </div>

          <div className={styles.hall}>
            <p>Ряд</p>
            <TransformWrapper>
              <div className={styles['hall__matrix-seats']}>
                <TransformComponent>
                  <div className={styles['hall__seats-schema']}>
                    {seanceLocal &&
                      seanceLocal.hall.places.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles['row']}>
                          <p className={styles['row__number']}>{rowIndex + 1}</p>
                          {row.map((column, columnIndex) => {
                            const type =
                              column.type === 'ECONOM'
                                ? 'seat_econom'
                                : column.type === 'BLOCKED'
                                  ? 'seat_blocked'
                                  : 'seat_comfort';

                            return (
                              <div
                                key={columnIndex}
                                className={`${styles['seat']} 
                                  ${styles[type]}
                                  ${cinemaPayment.tickets.find((item) => item.row === rowIndex && item.column === columnIndex) && styles[`${type + '_active'}`]}
                                `}
                                onClick={() => {
                                  console.log(column.type);
                                  if (column.type !== 'BLOCKED')
                                    cinemaPayment.tickets.find(
                                      (item) =>
                                        item.row === rowIndex &&
                                        item.column === columnIndex
                                    )
                                      ? setDropTicket({
                                        row: rowIndex,
                                        column: columnIndex,
                                        price: column.price
                                      })
                                      : setAddTicket({
                                        row: rowIndex,
                                        column: columnIndex,
                                        price: column.price
                                      });
                                }}
                              >
                                {cinemaPayment.tickets.find(
                                  (item) =>
                                    item.row === rowIndex && item.column === columnIndex
                                ) && (
                                    <p className={styles['seat__seat-index']}>{columnIndex + 1}</p>
                                  )}
                              </div>
                            );
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
      )}
      {cinemaPayment.tickets.length ? (
        <div className={styles.result}>
          <div className={styles.result__container}>
            <p className={styles.result__undertitle}>Места</p>
            <p className={styles['result__text-seats']}>{getSeats(cinemaPayment.tickets)}</p>
            <p className={styles['result__text-price']}>
              Сумма:{' '}
              {cinemaPayment.tickets.reduce((result, ticket) => {
                return (result += ticket.price);
              }, 0)}{' '}
              ₽
            </p>
          </div>
          {textButton && onClick ? (
            <Button variant='contained' onClick={onClick}>
              {textButton}
            </Button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
