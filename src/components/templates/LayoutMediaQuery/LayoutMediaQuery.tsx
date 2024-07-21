import { ReactNode } from "react"

import styles from './index.module.scss';

export type LayoutMediaQueryProps = {
  children?: ReactNode;
}

export const LayoutMediaQuery = ({ children }: LayoutMediaQueryProps) => (
  <div className={styles.wrapper}>
    <div className={styles['inner-wrapper']}>
      {children}
    </div>
  </div>
)