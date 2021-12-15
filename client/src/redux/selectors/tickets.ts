import { RootState } from '@redux/reducers';
export const allTicketsSelector = (state: RootState) => state.tickets.allTickets?.data;
export const allTicketsCountSelector = (state: RootState) => state.tickets.allTickets?.count;
export const currentTicketSelector = (state: RootState) => state.tickets.ticket;
