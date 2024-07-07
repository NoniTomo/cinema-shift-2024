import { useNavigate } from 'react-router-dom'

import Header from '../../modules/Header/Header'
import PaymentCardForm from '../../modules/PaymentCardForm/PaymentCardForm'
import { ReactComponent as ArrowLeftIcon } from '../../../assets/svg/Arrow_Left.svg'

import styles from './index.module.scss'

export default function YourCard() {
  const navigate = useNavigate()
  return (
    <>
      <Header to="/cinema/today" Icon={ArrowLeftIcon} text="Карта оплаты" />
      <div className={styles.wrapper}>
        <PaymentCardForm onSubmit={() => navigate('../cinema/today')} />
      </div>
    </>
  )
}
