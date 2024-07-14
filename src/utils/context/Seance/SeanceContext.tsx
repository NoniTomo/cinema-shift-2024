import { createContext } from 'react';
import IDaySchedule from '@/utils/types/IDaySchedule';

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
