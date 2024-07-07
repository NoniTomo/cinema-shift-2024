import styles from './index.module.scss'
import { Link } from 'react-router-dom'
/* import { ReactComponent as CinemaLogoIcon } from '../../../assets/svg/CinemaLogo.svg';
import { ReactComponent as ExitIcon } from '../../../assets/svg/Exit.svg';
import { ReactComponent as TicketIcon } from '../../../assets/svg/Ticket.svg';
import { ReactComponent as UserIcon } from '../../../assets/svg/User.svg';
 */

type Props = {
  text?: string | number
  to?: string
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

function Header({ text, to, Icon }: Props) {
  function headerChildren({
    Icon,
    text,
  }: {
    text?: string | number
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
  }) {
    return (
      <>
        {Icon && <Icon className={`${styles.header__icon}`} />}
        {text && <p className={`${styles['header__page-name']}`}>{text}</p>}
      </>
    )
  }

  return (
    <header className={styles.header}>
      {!to ? (
        <div className={styles.header__wrapper}>
          {headerChildren({ Icon, text })}
        </div>
      ) : (
        <Link to={to} className={styles.header__wrapper}>
          {headerChildren({ Icon, text })}
        </Link>
      )}
    </header>
  )
}

export default Header
