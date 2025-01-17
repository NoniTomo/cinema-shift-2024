import { ReactNode, useReducer, useState } from 'react';
import { CinemaPaymentContext, defaultValue } from './CinemaPaymentContext';

export type CinemaPaymentProviderType = {
  children: ReactNode;
};

type SetFilmName = {
  type: 'set-film-name';
  data: {
    filmName: string;
  };
};
type SetFilm = {
  type: 'set-filmId';
  data: {
    filmId: string;
  };
};
type SetPerson = {
  type: 'set-person';
  data: CreatePaymentPersonDto;
};
type SetCard = {
  type: 'set-debit-card';
  data: PaymentCard;
};
type SetSeance = {
  type: 'set-seance';
  data: Seance;
};
type setTickets = {
  type: 'set-tickets';
  data: CreatePaymentTicketsDto[] | [];
};
type setTicket = {
  type: 'add-one-tickets' | 'remove-one-tickets';
  data: CreatePaymentTicketsDto;
};
type ActionSeance =
  | SetFilm
  | SetFilmName
  | SetPerson
  | SetCard
  | SetSeance
  | setTicket
  | setTickets;

function cinemaPaymentReducer(
  state: CreateCinemaPaymentDto,
  action: ActionSeance
): CreateCinemaPaymentDto {
  switch (action.type) {
    case 'set-film-name': {
      return {
        ...state,
        filmName: action.data.filmName
      };
    }
    case 'set-filmId': {
      return {
        ...state,
        filmId: action.data.filmId
      };
    }
    case 'set-person': {
      return {
        ...state,
        person: {
          firstname: action.data.firstname,
          middlename: action.data.middlename,
          lastname: action.data.lastname,
          phone: action.data.phone
        }
      };
    }
    case 'set-debit-card': {
      return {
        ...state,
        debitCard: {
          pan: action.data.pan,
          expireDate: action.data.expireDate,
          cvv: action.data.cvv
        }
      };
    }
    case 'set-seance': {
      return {
        ...state,
        seance: {
          date: action.data.date,
          time: action.data.time,
          hall: action.data.hall
        }
      };
    }
    case 'add-one-tickets': {
      return {
        ...state,
        tickets: [
          ...state.tickets,
          {
            row: action.data.row,
            column: action.data.column,
            price: action.data.price
          }
        ]
      };
    }
    case 'set-tickets': {
      return {
        ...state,
        tickets: [
          ...action.data.map((ticket) => {
            return {
              row: ticket.row,
              column: ticket.column,
              price: ticket.price
            };
          })
        ]
      };
    }
    case 'remove-one-tickets': {
      return {
        ...state,
        tickets: [
          ...state.tickets.filter(
            (ticket) => !(ticket.column === action.data.column && ticket.row === action.data.row)
          )
        ]
      };
    }
    default: {
      return state;
    }
  }
}

export const CinemaPaymentProvider = ({ children }: CinemaPaymentProviderType) => {
  const [cinemaPayment, dispatchCinemaPayment] = useReducer(cinemaPaymentReducer, defaultValue);
  const [paymentIsReady, setPaymentIsReady] = useState(false);
  const [orderCode, setOrderCode] = useState<null | number>(null);

  const setFilmName = (filmName: string) => {
    dispatchCinemaPayment({
      type: 'set-film-name',
      data: { filmName }
    });
  };
  const setFilmId = (filmId: string) => {
    dispatchCinemaPayment({
      type: 'set-filmId',
      data: { filmId }
    });
  };
  const setPerson = (person: CreatePaymentPersonDto) => {
    dispatchCinemaPayment({
      type: 'set-person',
      data: person
    });
  };
  const setDebitCard = (paymentCard: PaymentCard) => {
    setPaymentIsReady(true);
    dispatchCinemaPayment({
      type: 'set-debit-card',
      data: paymentCard
    });
  };
  const setSeance = (seance: Seance) => {
    dispatchCinemaPayment({
      type: 'set-seance',
      data: seance
    });
  };
  const setAddTicket = (ticket: CreatePaymentTicketsDto) => {
    dispatchCinemaPayment({
      type: 'add-one-tickets',
      data: ticket
    });
  };
  const setTickets = (tickets: CreatePaymentTicketsDto[] | []) => {
    dispatchCinemaPayment({
      type: 'set-tickets',
      data: tickets
    });
  };
  const setDropTicket = (ticket: CreatePaymentTicketsDto) => {
    dispatchCinemaPayment({
      type: 'remove-one-tickets',
      data: ticket
    });
  };

  return (
    <CinemaPaymentContext.Provider
      value={{
        cinemaPayment,
        paymentIsReady,
        orderCode,

        setOrderCode,
        setTickets,
        setAddTicket,
        setDropTicket,
        setFilmName,
        setFilmId,
        setPerson,
        setDebitCard,
        setSeance
      }}
    >
      {children}
    </CinemaPaymentContext.Provider>
  );
};
