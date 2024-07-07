import styles from './index.module.scss'
import { ReactComponent as TicketActiveIcon } from '../../../assets/svg/TicketActive.svg'
import { ReactComponent as TicketNotActiveIcon } from '../../../assets/svg/TicketNotActive.svg'
import { ReactComponent as UserActiveIcon } from '../../../assets/svg/UserActive.svg'
import { ReactComponent as UserNotActiveIcon } from '../../../assets/svg/UserNotActive.svg'
import { ReactComponent as MovieActiveIcon } from '../../../assets/svg/MovieActive.svg'
import { ReactComponent as MovieNotActiveIcon } from '../../../assets/svg/MovieNotActive.svg'
import { FooterButton } from '../../elements/FooterButton/FooterButton'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__actions}>
        <div className={styles.footer__button}>
          <FooterButton
            to={`/cinema/today`}
            IconActive={<MovieActiveIcon />}
            IconNotActive={<MovieNotActiveIcon />}
            text="Афиша"
          />
        </div>
        <div className={styles.footer__button}>
          <FooterButton
            to={`/cinema/orders`}
            IconActive={<TicketActiveIcon />}
            IconNotActive={<TicketNotActiveIcon />}
            text="Билеты"
          />
        </div>
        <div className={styles.footer__button}>
          <FooterButton
            to={`/cinema/users/profile`}
            IconActive={<UserActiveIcon />}
            IconNotActive={<UserNotActiveIcon />}
            text="Профиль"
          />
        </div>
      </div>
    </footer>
  )
}
