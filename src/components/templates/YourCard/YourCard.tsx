import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/modules/Header/Header';
import PaymentCardForm from '@components/modules/PaymentCardForm/PaymentCardForm';
import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { UserContext } from '@/context/UserContext';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import { PaymentCard } from '@/types/dto';
import { Loading } from '@/components/modules/Loading/Loading';

import styles from './index.module.scss';

export type Props = {
  toBack?: () => void;
  toForward: () => void;
  type?: 'desktop' | 'mobile';
};

export default function YourCard({ toBack, toForward, type = 'mobile' }: Props) {
  const navigate = useNavigate();
  const { isUserLogged } = useContext(UserContext);
  const { setDebitCard, handleCinemaPayment, loading, paymentIsReady } =
    useContext(CinemaPaymentContext);

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  useEffect(() => {
    if (paymentIsReady) {
      handleCinemaPayment(toForward);
    }
  }, [handleCinemaPayment, toForward]);

  const submitPaymentCard = async (data: PaymentCard) => {
    setDebitCard(data);
  };

  if (loading) return <Loading />;

  return (
    <>
      {type === 'mobile' && <Header onClick={toBack} Icon={ArrowLeftIcon} text='Карта оплаты' />}
      <div className={styles.wrapper}>
        <PaymentCardForm onSubmit={submitPaymentCard} />
      </div>
    </>
  );
}
