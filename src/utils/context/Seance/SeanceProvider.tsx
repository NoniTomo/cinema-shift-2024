import { ReactNode, useReducer } from 'react';
import { SeanceContext } from './SeanceContext';

type ActionSchedule = {
  type: 'set-schedules';
  data: Schedule[];
};

function scheduleReducer(state: Schedule[], action: ActionSchedule) {
  switch (action.type) {
    case 'set-schedules': {
      return [...action.data];
    }
    default: {
      return state;
    }
  }
}

type Props = {
  children: ReactNode;
};

export const SeanceProvider = ({ children }: Props) => {
  const [schedules, dispatchSchedule] = useReducer(scheduleReducer, []);

  const setSchedule = (schedules: Schedule[]) => {
    dispatchSchedule({
      type: 'set-schedules',
      data: schedules
    });
  }

  const contextValue = {
    schedules,
    setSchedule,
  }

  return <SeanceContext.Provider value={contextValue}>{children}</SeanceContext.Provider>;
};
