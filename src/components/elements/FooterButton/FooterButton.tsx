import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';

type Props = {
  to: string;
  IconActive?: JSX.Element;
  IconNotActive?: JSX.Element;
  text?: string;
} & ComponentProps<'button'>;

const FooterButton = ({ to, IconActive, IconNotActive, text, ...props }: Props) => (
  <NavLink className={styles.link} to={to}>
    {({ isActive }) => (
      <button {...props} className={`${styles.button}`}>
        {isActive ? IconActive : IconNotActive}
        <p className={`${styles.text} ${isActive ? styles.text_active : ''}`}>{text}</p>
      </button>
    )}
  </NavLink>
);

export { FooterButton };
