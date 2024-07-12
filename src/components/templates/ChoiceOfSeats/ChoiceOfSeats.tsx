import { useContext } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@components/elements/Button/Button';
import Header from '@components/modules/Header/Header';
import { SeanceContext } from '@/context/SeanceContext';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import styles from './index.module.scss';
import SeatingMatrix from '@/components/modules/SeatingMatrix/SeatingMatrix';

export type Props = {
  toBack: () => void;
  toForward: () => void;
};

export default function ChoiceOfSeats({ toBack, toForward }: Props) {
  const { schedules, error } = useContext(SeanceContext);
  const { cinemaPayment } = useContext(CinemaPaymentContext);

  const handleOnClick = () => {
    if (cinemaPayment.tickets.length > 0) {
      toForward();
    } else {
      toast.error('Выберите места', {
        position: 'top-left'
      });
    }
  };

  return (
    <>
      {!error && schedules ? (
        <>
          <Header onClick={toBack} Icon={ArrowLeftIcon} text='Выбор места' />
          <div className={`${styles.wrapper}`}>
            <div className={`${styles.schema}`}>
              <SeatingMatrix />
              <Button variant='contained' onClick={handleOnClick}>
                Продолжить
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )}
    </>
  );
}
