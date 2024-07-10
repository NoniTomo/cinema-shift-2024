import { ReactNode, createContext, useReducer, useState } from 'react';
import config from '../config';
import IDaySchedule from '../types/IDaySchedule';
import { RequestClient } from '@/utils/axiosAPI';

type ActionSchedule = {
  type: 'get-schedules';
  data: IDaySchedule[];
};

function scheduleReducer(state: IDaySchedule[], action: ActionSchedule) {
  console.log('[ ...action.data ]: ', [...action.data]);
  switch (action.type) {
    case 'get-schedules': {
      return [...action.data];
    }
    default: {
      return state;
    }
  }
}

export type SeanceContextType = {
  handleGetSchedule: (filmId: number) => Promise<void>;
  schedules?: IDaySchedule[];
  error: boolean;
  loading: boolean;
};

export const SeanceContext = createContext<SeanceContextType>({
  handleGetSchedule: async () => {},
  error: false,
  loading: true
});

type Props = {
  children: ReactNode;
};

const SeanceProvider = ({ children }: Props) => {
  const [schedules, dispatchSchedule] = useReducer(scheduleReducer, []);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('schedules = ', schedules);
  const handleGetSchedule = async (filmId: number) => {
    setError(false);
    setLoading(true);
    await RequestClient.get(`${config.PUBLIC_SERVER_URL}/cinema/film/${filmId}/schedule`)
      .then((res) => {
        if (res.data?.success) {
          console.log('res.data?.success = ', res.data?.success);
          console.log('res.data.schedule = ', res.data.schedules);
          setError(false);
          dispatchSchedule({
            type: 'get-schedules',
            data: res.data.schedules
          });
        } else throw new Error('Ошибка при выполнении запроса');
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));

    return;
  };

  const contextValue = schedules
    ? {
        handleGetSchedule,
        schedules,
        error,
        loading
      }
    : {
        handleGetSchedule,
        error,
        loading
      };

  return <SeanceContext.Provider value={contextValue}>{children}</SeanceContext.Provider>;
};

export default SeanceProvider;
