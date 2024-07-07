import Header from '../../modules/Header/Header';
import {ReactComponent as CrossIcon} from '@/assets/svg/Cross.svg';
import { useNavigate } from 'react-router-dom';
import UserDataForm from '../../modules/UserData/UserData';
import styles from './index.module.scss';

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Header to='/cinema/today' Icon={CrossIcon}/>
      <div className={styles.wrapper}>
        <UserDataForm buttonText='Продолжить' onSubmit={() => navigate('')} />
      </div>
    </>
  )
}