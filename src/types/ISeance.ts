export default interface ISeance {
  time: string;
  hall: {
    name: 'Red' | 'Green' | 'Blue';
    places: IPlace[][];
  };
  payedTickets: [];
}

export interface IPlace {
  price: number;
  type: 'ECONOM' | 'COMFORT' | 'BLOCKED';
}
