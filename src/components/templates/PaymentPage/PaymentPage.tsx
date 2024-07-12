import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import YourCard from '@components/templates/YourCard/YourCard';
import Success from '@components/templates/Success/Success';
import useMobileDetect from '@/hooks/useMobileDetect/useMobileDetect';
import { CinemaPaymentContext } from '@/context/CinemaPaymentContext';
import Header from '@/components/modules/Header/Header';
import { UserContext } from '@/context/UserContext';
import { Modal } from '@/components/modules/Modal/Modal';

import styles from './index.module.scss';

export default function PaymentPage() {
  const [open, setOpen] = useState(false);
  const { isUserLogged } = useContext(UserContext);
  const [stage, setStage] = useState<1 | 2>(1);
  const { isMobile } = useMobileDetect();
  const { cinemaPayment } = useContext(CinemaPaymentContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  const onPayment = () => {
    setStage(2);
    setOpen(true);
  };

  if (isMobile) {
    return (
      <>
        {stage === 1 && (
          <YourCard
            toBack={() => navigate(`../cinema/film/${cinemaPayment.filmId}`)}
            toForward={onPayment}
          />
        )}
        {stage === 2 && <Success />}
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <header className={styles.header}>Введите данные карты для оплаты</header>
            <YourCard type='desktop' toForward={onPayment} />
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Success type='desktop' />
        </Modal>
      </>
    );
  }
}
