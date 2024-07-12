import { useControls } from 'react-zoom-pan-pinch';

import { ReactComponent as PlusIcon } from '@assets/svg/plus.svg';
import { ReactComponent as MinusIcon } from '@assets/svg/minus.svg';

import styles from './index.module.scss';

export const Controls = () => {
  const { zoomIn, zoomOut } = useControls();
  return (
    <div className={styles.hall}>
      <button onClick={() => zoomIn()} className={styles.zoom__plus}>
        <PlusIcon />
      </button>
      <button onClick={() => zoomOut()} className={styles.zoom__minus}>
        <MinusIcon />
      </button>
    </div>
  );
};
