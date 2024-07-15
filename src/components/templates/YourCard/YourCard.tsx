import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { PaymentCard } from '@/utils/types/dto';
import { Loading, Header, PaymentCardForm } from '@/components/modules';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';

export type YourCardProps = {
  toBack?: () => void;
  toForward: () => void;
  type?: 'desktop' | 'mobile';
};

export const YourCard = ({ toBack, toForward, type = 'mobile' }: YourCardProps) => {
  const navigate = useNavigate();
  const { isUserLogged } = useUser();
  const { setDebitCard, handleCinemaPayment, loading, paymentIsReady } = useCinemaPayment();

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  useEffect(() => {
    if (paymentIsReady) {
      handleCinemaPayment(toForward);
    }
  }, [paymentIsReady, handleCinemaPayment, toForward]);

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
};
