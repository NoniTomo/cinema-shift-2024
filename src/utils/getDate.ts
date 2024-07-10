export const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
export const month: string[] = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек'
];

export const getDate = (date: string) => {
  const currentYear: number = 2000 + +date.split('.')[2];
  const currentMonth: number = +date.split('.')[1] - 1;
  const currentDay: number = +date.split('.')[0];

  return new Date(currentYear, currentMonth, currentDay);
};

export const getDateToString = (dateString: string) => {
  const date = getDate(dateString);
  console.log('date = ', date);
  return `${days[date.getDay()]}, ${date.getDay()} ${month[date.getMonth()]}`;
};
