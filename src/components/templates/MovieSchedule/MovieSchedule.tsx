import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as ArrowLeftIcon } from '@assets/svg/Arrow_Left.svg';
import { Header, Schedule } from '@/components/modules';
import { LayoutMobile } from '../LayoutMobile/LayoutMobile';

export type MovieScheduleProps = {
  toBack: () => void;
  toForward: () => void;
};

export const MovieSchedule = ({ toBack, toForward }: MovieScheduleProps) => (
  <>
    <Header onClick={toBack} Icon={ArrowLeftIcon} text='Расписание' />
    <LayoutMobile>
      <Schedule toForward={toForward} />
    </LayoutMobile>
  </>
);
