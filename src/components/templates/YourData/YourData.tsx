import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/modules/Header/Header';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import UserDataForm from '@components/modules/UserDataForm/UserDataForm';
import { UserContext } from '@/context/UserContext';
import { Profile } from '@/types/dto';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';

import styles from './index.module.scss';

export type Props = {
  toBack: () => void;
  toForward: () => void;
};

export default function YourData({ toBack, toForward }: Props) {
  const { isUserLogged } = useContext(UserContext);
  const { setPerson } = useContext(CinemaPaymentContext);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  const submitPerson = (data: Profile) => {
    setPerson(data);
    toForward();
  };

  const navigate = useNavigate();
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
}
