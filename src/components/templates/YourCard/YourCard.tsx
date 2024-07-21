import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { Loading, Header, PaymentCardForm } from '@/components/modules';
import { useCinemaPayment } from '@/utils/context/CinemaPayment';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { postPayment } from '@/utils/api/requests';
import { showSuccess } from '@/utils/helpers/showSuccess';
import { showError } from '@/utils/helpers';

export type YourCardProps = {
  toBack?: () => void;
  toForward: () => void;
  type?: 'desktop' | 'mobile';
};

export const YourCard = ({ toBack, toForward, type = 'mobile' }: YourCardProps) => {
  const navigate = useNavigate();
  const { isUserLogged } = useUser();
  const { setDebitCard, cinemaPayment, setOrderCode } = useCinemaPayment();

  const postPaymentQuery = useQuery((params) => postPayment(params), {
    select: (response) => {
      return response.data.order.orderNumber;
    },
    onSuccess: (orderNumber) => {
      showSuccess('Ваш заказ оплачен');
      setOrderCode(orderNumber);
      toForward();
    },
    onError: (data) => {
      showError(data.message)
    },
    enabled: false,
  })

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged, navigate]);

  const submitPaymentCard = async (data: PaymentCard) => {
    setDebitCard(data);
    postPaymentQuery.refetch({ params: { ...cinemaPayment, debitCard: data } })
  };

  if (postPaymentQuery.isLoading) return <Loading />;

  return (
    <>
      {type === 'mobile' && <Header onClick={toBack} Icon={ArrowLeftIcon} text='Карта оплаты' />}
      <div className={styles.wrapper}>
        <PaymentCardForm onSubmit={submitPaymentCard} />
      </div>
    </>
  );
};
