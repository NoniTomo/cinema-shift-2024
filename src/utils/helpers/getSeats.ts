export const getSeats = (tickets: Ticket[] | CreatePaymentTicketsDto[]) => {
  const ticketsRows: (Ticket | CreatePaymentTicketsDto)[] = [];
  for (const ticket of tickets) {
    if (!ticketsRows.find((_ticket) => +_ticket.row === +ticket.row)) ticketsRows.push(ticket);
  }
  return ticketsRows
    .map((ticket) => {
      const columns = tickets
        .filter((_ticket) => ticket.row === _ticket.row)
        .map((_ticket) => +_ticket.column + 1)
        .join(', ');
      return `${+ticket.row + 1} ряд ${columns} ${columns.includes(',') ? 'места' : 'место'}`;
    })
    .join('; ');
};
