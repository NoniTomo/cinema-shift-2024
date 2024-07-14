import { Link, NavLink } from 'react-router-dom';

import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';
import { ReactComponent as CinemaLogo } from '@assets/svg/CinemaLogo.svg';
import { ReactComponent as UserActiveIcon } from '@assets/svg/UserActive.svg';
import { ReactComponent as UserNotActiveIcon } from '@assets/svg/UserNotActive.svg';
import { ReactComponent as TicketActiveIcon } from '@assets/svg/TicketActive.svg';
import { ReactComponent as TicketNotActiveIcon } from '@assets/svg/TicketNotActive.svg';
import { ReactComponent as EtranceActiveIcon } from '@assets/svg/EtranceActive.svg';
import { ReactComponent as EtranceNotActiveIcon } from '@assets/svg/EtranceNotActive.svg';
import { ReactComponent as ExitIcon } from '@assets/svg/Exit.svg';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';

export type HeaderProps = {
  text?: string | number;
  to?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

const HeaderChildren = ({
  Icon,
  text
}: {
  text?: string | number;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <>
    {Icon && <Icon className={`${styles.header__icon}`} />}
    {text && <p className={`${styles['header__page-name']}`}>{text}</p>}
  </>
);

export const Header = ({ text, to, Icon, onClick }: HeaderProps) => {
  const { isMobile } = useMobileDetect();
  const { isUserLogged, handleLogOut } = useUser();

  if (isMobile)
    return (
      <header className={styles.header}>
        {!to ? (
          <div onClick={onClick} className={styles.header__wrapper}>
            <HeaderChildren Icon={Icon} text={text} />
          </div>
        ) : (
          <Link to={to} className={styles.header__wrapper}>
            <HeaderChildren Icon={Icon} text={text} />
          </Link>
        )}
      </header>
    );

  return (
    <header className={styles.header}>
      <div className={styles['header-desktop']}>
        <nav className={styles['header-desktop__navigation']}>
          <Link className={styles.link} to='cinema/today'>
            <CinemaLogo className={`${styles.header__icon}`} />
          </Link>
          {isUserLogged && (
            <>
              <NavLink className={styles.link} to='/cinema/users/profile'>
                {({ isActive }) => (
                  <div className={styles['header-desktop__button']}>
                    {isActive ? (
                      <UserActiveIcon className={`${styles.header__icon}`} />
                    ) : (
                      <UserNotActiveIcon className={`${styles.header__icon}`} />
                    )}
                    <p className={`${styles[`header-desktop__text${isActive ? '_active' : ''}`]}`}>
                      Профиль
                    </p>
                  </div>
                )}
              </NavLink>
              <NavLink className={styles.link} to='/cinema/orders'>
                {({ isActive }) => (
                  <div className={styles['header-desktop__button']}>
                    {isActive ? (
                      <TicketActiveIcon className={`${styles.header__icon}`} />
                    ) : (
                      <TicketNotActiveIcon className={`${styles.header__icon}`} />
                    )}
                    <p className={`${styles[`header-desktop__text${isActive ? '_active' : ''}`]}`}>
                      Билеты
                    </p>
                  </div>
                )}
              </NavLink>
            </>
          )}
        </nav>
        <div className={styles['header__session-control']}>
          {isUserLogged ? (
            <div className={styles['header-desktop__button']} onClick={handleLogOut}>
              <ExitIcon className={`${styles.header__icon}`} />
              <p className={`${styles['header-desktop__text']}`}>Выйти</p>
            </div>
          ) : (
            <NavLink className={styles.link} to='/cinema/users/signin'>
              {({ isActive }) => (
                <div className={styles['header-desktop__button']}>
                  {isActive ? (
                    <EtranceActiveIcon className={`${styles.header__icon}`} />
                  ) : (
                    <EtranceNotActiveIcon className={`${styles.header__icon}`} />
                  )}
                  <p className={`${styles[`header-desktop__text${isActive ? '_active' : ''}`]}`}>
                    Войти
                  </p>
                </div>
              )}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
