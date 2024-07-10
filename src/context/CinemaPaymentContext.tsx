import { createContext, ReactNode, useReducer, useState } from 'react';
import { Profile, CreateCinemaPaymentDto, PaymentCard, Seance, Ticket } from '../types/dto';
import { RequestClient } from '@/utils/axiosAPI';
import { toast } from 'react-toastify';

const defaultValue: CreateCinemaPaymentDto = {
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
  data: Profile;
};
type SetCard = {
  type: 'set-debit-card';
  data: PaymentCard;
};
type SetSeance = {
  type: 'set-seance';
  data: Seance;
};
type SetTickets = {
  type: 'set-tickets';
  data: Ticket[];
};
type ActionSeance = SetFilm | SetFilmName | SetPerson | SetCard | SetSeance | SetTickets;

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
          email: action.data.email,
          city: action.data.city,
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
    case 'set-tickets': {
      return {
        ...state,
        tickets: [
          ...action.data.map((ticket) => {
            return {
              row: ticket.row,
              column: ticket.column
            };
          })
        ]
      };
    }
    default: {
      return state;
    }
  }
}

export type CinemaPaymentContextType = {
  cinemaPayment: CreateCinemaPaymentDto;
  loading: boolean;
  error: boolean;
  paymentIsReady: boolean;
  SetFilmName: (filmName: string) => void;
  setFilmId: (filmId: string) => void;
  setPerson: (person: Profile) => void;
  setDebitCard: (paymentCard: PaymentCard) => void;
  setSeance: (seance: Seance) => void;
  setTickets: (tickets: Ticket[]) => void;
  handleCinemaPayment: () => Promise<void>;
};

export const CinemaPaymentContext = createContext<CinemaPaymentContextType>({
  cinemaPayment: defaultValue,
  loading: false,
  error: false,
  paymentIsReady: false,
  SetFilmName: (filmName: string) => {},
  setFilmId: (filmId: string) => {},
  setPerson: (person: Profile) => {},
  setDebitCard: (paymentCard: PaymentCard) => {},
  setSeance: (seance: Seance) => {},
  setTickets: (tickets: Ticket[]) => {},
  handleCinemaPayment: async () => {}
});

export type CinemaPaymentProviderType = {
  children: ReactNode;
};

const CinemaPaymentProvider = ({ children }: CinemaPaymentProviderType) => {
  const [cinemaPayment, dispatchCinemaPayment] = useReducer(cinemaPaymentReducer, defaultValue);
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const [paymentIsReady, setPaymentIsReady] = useState(false);

  const SetFilmName = (filmName: string) => {
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
  const setPerson = (person: Profile) => {
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
    console.log('seance = ', seance);
    dispatchCinemaPayment({
      type: 'set-seance',
      data: seance
    });
  };
  const setTickets = (tickets: Ticket[]) => {
    console.log('tickets = ', tickets);
    dispatchCinemaPayment({
      type: 'set-tickets',
      data: tickets
    });
  };
  const handleCinemaPayment = async () => {
    setIsLoading(true);
    setIsError(false);
    await RequestClient.post('/cinema/payment', cinemaPayment, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.success) {
          setIsError(false);
        } else {
          toast.error(res.data.reason, {
            position: 'top-left'
          });
          throw new Error(res.data.reason);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
        setPaymentIsReady(false);
      });
  };
  console.log('CinemaPaymentContext | cinemaPayment = ', cinemaPayment);
  return (
    <CinemaPaymentContext.Provider
      value={{
        cinemaPayment,
        loading,
        error,
        paymentIsReady,
        handleCinemaPayment,

        SetFilmName,
        setFilmId,
        setPerson,
        setDebitCard,
        setSeance,
        setTickets
      }}
    >
      {children}
    </CinemaPaymentContext.Provider>
  );
};

export default CinemaPaymentProvider;
