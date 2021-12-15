import { ITickets, TicketsActionsTypes, TiketsActions } from '@redux/types/tickets';

const initialState: ITickets = {};

const tickets = (state = initialState, action: TiketsActions): ITickets => {
    switch (action.type) {
        case TicketsActionsTypes.SET_ALL_TICKETS:
            return {
                ...state,
                allTickets: action.payload
            };
        case TicketsActionsTypes.SET_TICKET:
            return {
                ...state,
                ticket: action.payload
            };

        default:
            return state;
    }
};

export default tickets;
