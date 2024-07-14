import ISeance from './ISeance';

export default interface IDaySchedule {
  date: string;
  seances: ISeance[];
}
