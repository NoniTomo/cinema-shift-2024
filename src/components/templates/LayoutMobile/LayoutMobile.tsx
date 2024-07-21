import { ReactNode } from "react"

import styles from './index.module.scss';

export type LayoutMobileProps = {
  children?: ReactNode;
}

export const LayoutMobile = ({ children }: LayoutMobileProps) => (
  <div className={styles.wrapper}>
    <div className={styles['inner-wrapper']}>
      {children}
    </div>
  </div>
)