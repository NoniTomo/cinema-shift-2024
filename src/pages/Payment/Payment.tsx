import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Success, YourCard } from '@components/templates';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';
import { Modal, Header } from '@/components/modules';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';

import styles from './index.module.scss';

export const Payment = () => {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<1 | 2>(1);
  const { isMobile } = useMobileDetect();
  const { cinemaPayment } = useCinemaPayment();
  const navigate = useNavigate();

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
};
