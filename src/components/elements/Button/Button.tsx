import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

type ButtonProps = {
  variant?: 'contained' | 'outlined' | 'text';
  children?: ReactNode;
} & ComponentProps<'button'>;

export const Button = ({ variant = 'contained', children, ...props }: ButtonProps) => (
  <button
    {...props}
    className={clsx(styles.button, {
      [styles.button_contained]: variant === 'contained',
      [styles.button_outlined]: variant === 'outlined',
      [styles.button_text]: variant === 'text'
    })}
  >
    {children}
  </button>
);
