import { ReactComponent as TicketActiveIcon } from '@assets/svg/TicketActive.svg';
import { ReactComponent as TicketNotActiveIcon } from '@assets/svg/TicketNotActive.svg';
import { ReactComponent as UserActiveIcon } from '@assets/svg/UserActive.svg';
import { ReactComponent as UserNotActiveIcon } from '@assets/svg/UserNotActive.svg';
import { ReactComponent as MovieActiveIcon } from '@assets/svg/MovieActive.svg';
import { ReactComponent as MovieNotActiveIcon } from '@assets/svg/MovieNotActive.svg';
import { FooterButton } from '@components/elements';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';

import styles from './index.module.scss';

export const Footer = () => {
  const { isMobile } = useMobileDetect();

  if (isMobile)
    return (
      <footer className={styles.footer}>
        <ul className={styles.footer__actions}>
          <li className={styles.footer__button}>
            <FooterButton
              to={`/cinema/today`}
              IconActive={<MovieActiveIcon />}
              IconNotActive={<MovieNotActiveIcon />}
              text='Афиша'
            />
          </li>
          <li className={styles.footer__button}>
            <FooterButton
              to={`/cinema/orders`}
              IconActive={<TicketActiveIcon />}
              IconNotActive={<TicketNotActiveIcon />}
              text='Билеты'
            />
          </li>
          <li className={styles.footer__button}>
            <FooterButton
              to={`/cinema/users/profile`}
              IconActive={<UserActiveIcon />}
              IconNotActive={<UserNotActiveIcon />}
              text='Профиль'
            />
          </li>
        </ul>
      </footer>
    );
};
