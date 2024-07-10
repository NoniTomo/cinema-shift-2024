export type SignInDto = {
  phone: string;
  code: string;
};

export type Profile = {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
  phone: string;
};
export type PaymentCard = {
  pan: string;
  expireDate: string;
  cvv: string;
};
export type Seance = {
  date: string;
  time: string;
  hall: string;
};
export type Ticket = {
  row: string;
  column: string;
};

export type UpdateProfileDto = {
  profile: Profile;
  phone: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  reason: string;
  user: Profile;
};

export type SessionResponse = {
  success: boolean;
  reason: string;
  user: Profile;
};

export type CreateOtpDto = {
  phone: string;
};

export type OtpResponse = {
  success: boolean;
  reason: string;
  retryDelay: number;
};

export type CreateCinemaPaymentDto = {
  filmName: string;
  filmId: string;
  person: Profile;
  debitCard: PaymentCard;
  seance: Seance;
  tickets: Ticket[];
};

export type Order = {
  filmName: string;
  orderNumber: number;
  tickets: TicketOrder[];
  phone: string;
  status: 'PAYED' | 'CANCELED';
};

export type TicketOrder = {
  filmId: string;
  row: number;
  column: number;
  seance: {
    date: string;
    time: string;
  };
  phone: string;
};
