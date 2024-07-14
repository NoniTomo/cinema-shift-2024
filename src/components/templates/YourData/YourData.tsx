import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, UserDataForm } from '@components/modules';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { Profile } from '@/utils/types/dto';

import styles from './index.module.scss';
import { useUser } from '@/utils/context/User';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

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

  const submitPerson = (data: Profile) => {
    setPerson(data);
    toForward();
  };
  return (
    <>
      <Header onClick={toBack} Icon={ArrowLeftIcon} text='Ваши данные' />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <UserDataForm buttonText='Продолжить' onSubmit={(data: Profile) => submitPerson(data)} />
        </div>
      </div>
    </>
  );
};
