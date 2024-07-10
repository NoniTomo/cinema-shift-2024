import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/modules/Header/Header';
import PaymentCardForm from '@components/modules/PaymentCardForm/PaymentCardForm';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { UserContext } from '@/context/UserContext';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { PaymentCard } from '@/types/dto';
import Loading from '@/components/modules/Loading/Loading';

import styles from './index.module.scss';
export default function YourCard() {
  const navigate = useNavigate();
  const { isUserLogged } = useContext(UserContext);
  const { setDebitCard, handleCinemaPayment, loading, paymentIsReady } =
    useContext(CinemaPaymentContext);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  useEffect(() => {
    paymentIsReady &&
      handleCinemaPayment()
        .then(() => navigate('../cinema/success'))
        .catch((err) => navigate('../cinema/today'));
  }, [paymentIsReady]);

  const submitPaymentCard = async (data: PaymentCard) => {
    setDebitCard(data);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header to='/cinema/today' Icon={ArrowLeftIcon} text='Карта оплаты' />
      <div className={styles.wrapper}>
        <PaymentCardForm onSubmit={submitPaymentCard} />
      </div>
    </>
  );
}
