import {
    IAddNewCommentActionPayload,
    IChangeTicketStatusPayload,
    IQueryParamsPayload,
    ISetTicketsPayload,
    ICreateTicketActionPayload,
    TicketsActionsTypes
} from '@redux/types/tickets';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const setAllTicketsAction = actionGenerator<ISetTicketsPayload>(
    TicketsActionsTypes.SET_ALL_TICKETS
);

export const getAllTicketsAction = actionGenerator<IQueryParamsPayload>(
    TicketsActionsTypes.GET_ALL_TICKETS
);
export const deleteTicketAction = actionGenerator<{ ticketID: string; query: IQueryParamsPayload }>(
    TicketsActionsTypes.DELETE_TICKET
);
export const createTicketAction = actionGenerator<ICreateTicketActionPayload>(
    TicketsActionsTypes.CREATE_TICKET
);
export const changeTicketStatusAction = actionGenerator<IChangeTicketStatusPayload>(
    TicketsActionsTypes.CHANGE_TICKET_STATUS
);

export const setTicketByIDAction = actionGenerator<ISetTicketsPayload>(
    TicketsActionsTypes.SET_TICKET
);

export const getTicketByIDAction = actionGenerator<string>(TicketsActionsTypes.GET_TICKET_BY_ID);

export const addNewComment = actionGenerator<IAddNewCommentActionPayload>(
    TicketsActionsTypes.ADD_NEW_COMMENT
);
