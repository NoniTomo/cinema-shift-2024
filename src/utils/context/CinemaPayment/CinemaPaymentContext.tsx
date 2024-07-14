import { createContext } from 'react';
import { Profile, CreateCinemaPaymentDto, PaymentCard, Seance, Ticket } from '../../types/dto';

export const defaultValue: CreateCinemaPaymentDto = {
  filmName: '',
  filmId: '',
  person: {
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    city: '',
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
  loading: boolean;
  error: boolean;
  paymentIsReady: boolean;
  setTickets: (tickets: Ticket[] | []) => void;
  setAddTicket: (ticket: Ticket) => void;
  setDropTicket: (ticket: Ticket) => void;
  setFilmName: (filmName: string) => void;
  setFilmId: (filmId: string) => void;
  setPerson: (person: Profile) => void;
  setDebitCard: (paymentCard: PaymentCard) => void;
  setSeance: (seance: Seance) => void;
  handleCinemaPayment: (toForward: () => void) => void;
};

export const CinemaPaymentContext = createContext<CinemaPaymentContextType>({
  cinemaPayment: defaultValue,
  loading: false,
  error: false,
  paymentIsReady: false,
  setTickets: (tickets: Ticket[] | []) => {},
  setAddTicket: (ticket: Ticket) => {},
  setDropTicket: (ticket: Ticket) => {},
  setFilmName: (filmName: string) => {},
  setFilmId: (filmId: string) => {},
  setPerson: (person: Profile) => {},
  setDebitCard: (paymentCard: PaymentCard) => {},
  setSeance: (seance: Seance) => {},
  handleCinemaPayment: async () => {}
});
