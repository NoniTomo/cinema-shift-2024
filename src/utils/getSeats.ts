import { Ticket, TicketOrder } from './../types/dto';

export const getSeats = (tickets: Ticket[] | TicketOrder[]) => {
  return tickets
    .map((ticket) => {
      const columns = tickets
        .filter((_ticket) => ticket.row === _ticket.row)
        .map((_ticket) => _ticket.column)
        .join(', ');
      return `${ticket.row} ряд ${columns} ${columns.includes(',') ? 'места' : 'место'}`;
    })
    .join('; ');
};
