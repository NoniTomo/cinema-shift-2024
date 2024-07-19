import { createContext } from 'react';

export type SeanceContextType = {
  schedules?: Schedule[];
  setSchedule: (data: Schedule[]) => void;
};

export const SeanceContext = createContext<SeanceContextType>({
  setSchedule: (data: Schedule[]) => { },
});
