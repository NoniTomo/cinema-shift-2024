import { createContext } from 'react';

export const defaultValue: CreateCinemaPaymentDto = {
  filmName: '',
  filmId: '',
  person: {
    firstname: '',
    middlename: '',
    lastname: '',
    phone: ''
  },
  debitCard: {
    pan: '',
    expireDate: '',
    cvv: ''
  },
  seance: {
    date: '',
    time: '',
    hall: ''
  },
  tickets: []
};

export type CinemaPaymentContextType = {
  cinemaPayment: CreateCinemaPaymentDto;

  paymentIsReady: boolean;
  setTickets: (tickets: CreatePaymentTicketsDto[] | []) => void;
  setAddTicket: (ticket: CreatePaymentTicketsDto) => void;
  setDropTicket: (ticket: CreatePaymentTicketsDto) => void;
  setFilmName: (filmName: string) => void;
  setFilmId: (filmId: string) => void;
  setPerson: (person: CreatePaymentPersonDto) => void;
  setDebitCard: (paymentCard: PaymentCard) => void;
  setSeance: (seance: Seance) => void;
};

export const CinemaPaymentContext = createContext<CinemaPaymentContextType>({
  cinemaPayment: defaultValue,
  paymentIsReady: false,
  setTickets: (tickets: CreatePaymentTicketsDto[] | []) => { },
  setAddTicket: (ticket: CreatePaymentTicketsDto) => { },
  setDropTicket: (ticket: CreatePaymentTicketsDto) => { },
  setFilmName: (filmName: string) => { },
  setFilmId: (filmId: string) => { },
  setPerson: (person: CreatePaymentPersonDto) => { },
  setDebitCard: (paymentCard: PaymentCard) => { },
  setSeance: (seance: Seance) => { },
});
