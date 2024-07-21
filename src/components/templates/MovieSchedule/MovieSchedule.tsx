import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { Header, Schedule } from '@/components/modules';
import { useSeance } from '@/utils/context/Seance';

import styles from './index.module.scss';

export type MovieScheduleProps = {
  toBack: () => void;
  toForward: () => void;
};

export const MovieSchedule = ({ toBack, toForward }: MovieScheduleProps) => (
  <>
    <Header onClick={toBack} Icon={ArrowLeftIcon} text='Расписание' />
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.schedules}`}>
        <Schedule toForward={toForward} />
      </div>
    </div>

  </>
);
