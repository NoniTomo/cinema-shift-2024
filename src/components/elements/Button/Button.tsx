import { ComponentProps, FC } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

type Props = {
  variant?: 'contained' | 'outlined' | 'text';
} & ComponentProps<'button'>;

const Button: FC<Props> = ({ variant = 'contained', children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(styles.button, {
        [styles.button_contained]: variant === 'contained',
        [styles.button_outlined]: variant === 'outlined',
        [styles.button_text]: variant === 'text',
      })}
    >
      {children}
    </button>
  );
};

export { Button };