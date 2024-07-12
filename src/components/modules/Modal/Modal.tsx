import { ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as CrossIcon } from '@assets/svg/Cross.svg';

import styles from './index.module.scss';

const modalRootElement = document.querySelector('#modal');

export type ModalProps = {
  children?: ReactNode;
  header?: ReactNode;
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ children, onClose, open }: ModalProps) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRootElement?.appendChild(element);

    return () => {
      modalRootElement?.removeChild(element);
    };
  }, [element]);

  if (open) {
    return createPortal(
      <div className={styles.modal__background} onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()} className={styles.modal__card}>
          <span className={styles.modal__header}>
            <CrossIcon onClick={onClose} className={styles.modal__icon} />
          </span>
          {children}
        </div>
      </div>,
      element
    );
  }

  return null;
};
