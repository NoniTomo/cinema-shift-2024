interface Response {
  success: boolean;
  reason: string
}

interface ScheduleResponse extends Response {
  schedules: Schedule[];
}

interface Schedule {
  date: string;
  seances: ScheduleSeance[];
}

interface ScheduleSeance {
  time: string;
  hall: {
    name: "Red" | "Green" | "Blue";
    places: {
      price: number;
      type: "COMFORT" | "ECONOM" | "BLOCKED"
    }[][]
  }
  payedTickets: Ticket[];
}

interface Ticket {
  filmId: string;
  row: number;
  column: number;
  seance: Seance;
  phone: string;
}

interface FilmResponse extends Response {
  film: Film;
}

interface Film {
  id: string;
  name: string;
  originalName: string;
  description: string;
  releaseDate: string;
  actors: FilmPerson[];
  directors: FilmPerson[];
  runtime: number;
  ageRating: "G" | "PG" | "PG13" | "R" | "NC17";
  genres: string[];
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
  country: {
    name: string;
    code: string;
    code2: string;
    id: string;
  } | null;
}

interface FilmPerson {
  id: string;
  professions: "ACTOR" | "DIRECTOR";
  fullName: string;
}

interface CinemaOrdersResponse extends Response {
  orders: CinemaOrder[];
}

interface CinemaOrder {
  _id: string;
  filmName: string;
  orderNumber: number;
  tickets: Ticket[];
  phone: string;
  status: "PAYED" | "CANCELED";
}

interface CreateCinemaPaymentDto {
  filmName: string;
  filmId: string;
  person: CreatePaymentPersonDto;
  debitCard: PaymentCard;
  seance: Seance;
  tickets: CreatePaymentTicketsDto[];
}

interface CreatePaymentTicketsDto {
  row: number;
  column: number;
  price: number;
};

interface CreatePaymentPersonDto {
  firstname: string;
  middlename: string;
  lastname: string;
  phone: string;
};

interface PaymentCard {
  pan: string;
  expireDate: string;
  cvv: string;
};

interface Seance {
  date: string;
  time: string;
  hall: string;
};

interface PaymentResponse extends Response {
  order: CinemaOrder;
}

interface FilmsResponse extends Response {
  films: Film[];
}

interface CreateOtpDto {
  phone: string;
}

interface OtpResponse extends Response {
  retryDelay: number;
}

interface UpdateProfileDto {
  profile: Profile;
  phone: string;
}

interface Profile {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
  phone: string;
}

interface UpdateProfileResponse extends Response {
  user: Profile;
}

interface SessionResponse {
  user: Profile;
}

interface SignInDto {
  phone: string;
  code: number;
}

interface SignInResponse {
  user: Profile;
  token: string;
}

