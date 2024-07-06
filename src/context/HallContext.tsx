import { ReactNode, createContext, useReducer, useState } from "react"
import axios from "axios";
import config from "../config";
import IDaySchedule from "../types/IDaySchedule";

type ActionSchedule = {
  type: 'get-schedules',
  data: IDaySchedule[]
}

function scheduleReducer(state: IDaySchedule[], action: ActionSchedule) {
  console.log('[ ...action.data ]: ', [ ...action.data ]);
  switch (action.type) {
    case 'get-schedules': {
      return [ ...action.data ];
    }
    default: {
      return state;
    }
  }
}

export type HallContextType = {
  handleGetSchedule: (filmId: number) => Promise<void>,
  schedules?: IDaySchedule[],
  error: boolean,
  loading: boolean
}

export const HallContext = createContext<HallContextType>({
  handleGetSchedule: async () => {},
  error: false,
  loading: true
});

type Props = {
  children: ReactNode
}

const HallProvider = ({ children }: Props) => {
  const [schedules, dispatchSchedule] = useReducer(scheduleReducer, []);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetSchedule = async (filmId: number) => {
    setError(false);
    setLoading(true);
    await axios.get(`${config.PUBLIC_SERVER_URL}/cinema/film/${filmId}/schedule`)
    .then((res) =>{
      if(res.data?.success) {
        console.log('res.data?.success = ', res.data?.success);
        console.log('res.data.schedule = ', res.data.schedules);
        dispatchSchedule({
          type: 'get-schedules',
          data: res.data.schedules
        });
      } else throw new Error('Ошибка при выполнении запроса');
    })
    .catch(() =>{
      setError(true);
    })
    .finally(() => setLoading(false))

    return;
  };

  const contextValue = (schedules) ? {
      handleGetSchedule,
      schedules,
      error,
      loading
    } : {
      handleGetSchedule,
      error,
      loading
    }

  return (
    <HallContext.Provider
      value={contextValue}
    >
      {children}
    </HallContext.Provider>
  )
}

/* export const useHallContext = () => {
  const data = useContext(HallContext);

  if (!data) {
    throw new Error("could not find trains context value");
  }

  return data;
} */

export default HallProvider;
