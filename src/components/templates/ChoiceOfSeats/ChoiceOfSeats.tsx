import { Button } from '@components/elements/Button/Button';
import { Header, SeatingMatrix } from '@components/modules';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';

import { useSeance } from '@/utils/context/Seance';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { showError } from '@/utils/helpers';
import { LayoutMobile } from '@components/templates';

export type ChoiceOfSeatsProps = {
  toBack: () => void;
  toForward: () => void;
};

export const ChoiceOfSeats = ({ toBack, toForward }: ChoiceOfSeatsProps) => {
  const { schedules } = useSeance();
  const { cinemaPayment } = useCinemaPayment();

  const handleOnClick = () => {
    if (cinemaPayment.tickets.length > 0) {
      toForward();
    } else {
      showError('Выберите места');
    }
  };

  return (
    <>
      {schedules ? (
        <>
          <Header onClick={toBack} Icon={ArrowLeftIcon} text='Выбор места' />
          <LayoutMobile>
            <SeatingMatrix />
            <Button variant='contained' onClick={handleOnClick}>
              Продолжить
            </Button>
          </LayoutMobile>
        </>
      ) : (
        <p>Возникла ошибка. Необходимо перезагрузить страницу</p>
      )
      }
    </>
  );
};
