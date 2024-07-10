import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/modules/Header/Header';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import UserDataForm from '@components/modules/UserDataForm/UserDataForm';

import styles from './index.module.scss';
import { UserContext } from '@/context/UserContext';
import { Profile } from '@/types/dto';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';

export default function YourData() {
  const { isUserLogged } = useContext(UserContext);
  const { setPerson } = useContext(CinemaPaymentContext);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  const submitPerson = (data: Profile) => {
    setPerson(data);
    navigate('../cinema/users/your-card');
  };

  const navigate = useNavigate();
  return (
    <>
      <Header
        to='/cinema/film/:filmId/schedule/choose-seat/'
        Icon={ArrowLeftIcon}
        text='Ваши данные'
      />
      <div className={styles.wrapper}>
        <UserDataForm buttonText='Продолжить' onSubmit={(data: Profile) => submitPerson(data)} />
      </div>
    </>
  );
}
