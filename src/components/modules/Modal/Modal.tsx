import { ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as CrossIcon } from '@assets/svg/Cross.svg';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className={styles.modal__background} onClick={onClose}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.1 }}
          exit={{ height: 0 }}
          onClick={(event) => event.stopPropagation()} className={styles.modal__card}
        >
          <span className={styles.modal__header}>
            <CrossIcon onClick={onClose} className={styles.modal__icon} />
          </span>
          {children}
        </motion.div>
      </motion.div>,
      element
    );
  }

  return null;
};
