import { useNavigate } from 'react-router-dom';

import Header from '../../modules/Header/Header';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg';
import UserDataForm from '../../modules/UserDataForm/UserDataForm';

import styles from './index.module.scss';

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Header to='/cinema/today' Icon={ArrowLeftIcon} text='Ваши данные'/>
      <div className={styles.wrapper}>
        <UserDataForm buttonText='Продолжить' onSubmit={() => navigate('')} />
      </div>
    </>
  )
}