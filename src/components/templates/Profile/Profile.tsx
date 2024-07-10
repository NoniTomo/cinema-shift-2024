import { useNavigate } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import UserDataForm from '../../modules/UserDataForm/UserDataForm';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';

import styles from './index.module.scss';

export default function Profile() {
  const navigate = useNavigate();

  const { isUserLogged } = useContext(UserContext);
  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Профиль' />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <UserDataForm buttonText='Обновить данные' onSubmit={() => navigate('')} />
        </div>
      </div>
      <Footer />
    </>
  );
}
