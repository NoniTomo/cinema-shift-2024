import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, UserDataForm } from '@components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { useUser } from '@/utils/context/User';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { LayoutMobile } from '../LayoutMobile/LayoutMobile';

import style from './index.module.scss';

export type YourDataProps = {
  toBack: () => void;
  toForward: () => void;
};

export const YourData = ({ toBack, toForward }: YourDataProps) => {
  const { isUserLogged } = useUser();
  const { setPerson } = useCinemaPayment();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  const submitPerson = (data: CreatePaymentPersonDto) => {
    setPerson(data);
    toForward();
  };

  return (
    <>
      <Header onClick={toBack} Icon={ArrowLeftIcon} text='Ваши данные' />
      <LayoutMobile>
        <div className={style.content}>
          <UserDataForm buttonText='Продолжить' onSubmit={(data: CreatePaymentPersonDto) => submitPerson(data)} />
        </div>
      </LayoutMobile>
    </>
  );
};
