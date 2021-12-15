import {
    IAddNewCommentActionPayload,
    IChangeTicketStatusPayload,
    ICreateTicketActionPayload,
    IQueryParamsPayload,
    ISetTicketsPayload
} from '@redux/types/tickets';
import { api } from '@services/api';

export const getAllTicketsApi = (payload: IQueryParamsPayload): Promise<ISetTicketsPayload[]> => {
    return api.get('/tickets', {
        params: payload
    });
};
export const deleteTicketApi = (payload: {
    ticketID: string;
    query: IQueryParamsPayload;
}): Promise<any> => {
    return api.delete('/tickets/' + payload.ticketID, {
        params: payload.query
    });
};
export const createTicketApi = (
    payload: ICreateTicketActionPayload
): Promise<ISetTicketsPayload> => {
    return api.post('/tickets', payload);
};
export const changeTicketStatusApi = (payload: IChangeTicketStatusPayload) => {
    return api.put('/tickets', payload);
};
export const getTicketByIDApi = (payload: string): Promise<ISetTicketsPayload> => {
    return api.get('/tickets/' + payload);
};
export const addNewCommentApi = (
    payload: IAddNewCommentActionPayload
): Promise<ISetTicketsPayload> => {
    return api.post('/tickets/answer', payload);
};
