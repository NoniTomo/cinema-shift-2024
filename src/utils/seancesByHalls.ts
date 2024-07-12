import ISeance from '../types/ISeance';

export default function seancesByHalls(seances: ISeance[]): { name: string; seances: ISeance[] }[] {
  if (!Array.isArray(seances)) {
    return [];
  }

  const greenHallSeances: ISeance[] = [],
    blueHallSeances: ISeance[] = [],
    redHallSeances: ISeance[] = [];
  for (const seance of seances) {
    switch (seance.hall.name) {
      case 'Red': {
        redHallSeances.push(seance);
        break;
      }
      case 'Blue': {
        blueHallSeances.push(seance);
        break;
      }
      case 'Green': {
        greenHallSeances.push(seance);
        break;
      }
    }
  }

  return [
    { name: 'Красный зал', seances: redHallSeances },
    { name: 'Синий зал', seances: blueHallSeances },
    { name: 'Зеленый зал', seances: greenHallSeances }
  ];
}
