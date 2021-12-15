export enum TicketsActionsTypes {
    GET_ALL_TICKETS = 'GET_ALL_TICKETS',
    SET_ALL_TICKETS = 'SET_ALL_TICKETS',
    DELETE_TICKET = 'DELETE_TICKET',
    CREATE_TICKET = 'CREATE_TICKET',
    CHANGE_TICKET_STATUS = 'CHANGE_TICKET_STATUS',
    GET_TICKET_BY_ID = 'GET_TICKET_BY_ID',
    SET_TICKET = 'SET_TICKET',
    ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
}
export interface ITickets {
    allTickets?: { data: ISetTicketsPayload[]; count: number };
    ticket?: ISetTicketsPayload;
}

//LOGIN

export interface ISetTicketsPayload {
    status: string;
    read: boolean;
    fileName: '';
    comments: { text: string; subject: string }[];
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    subject: string;
    phone: string;
    text: string;
    ticketID: string;
    __v: number;
}
export interface IQueryParamsPayload {
    offset: number;
    limit: number;
}
export interface ICreateTicketActionPayload {
    firstname: string;
    lastname: string;
    subject: string;
    email: string;
    destination: string;
    phone: string;
    fileName: string;
    text: string;
}
export interface IGetTickets {
    type: TicketsActionsTypes.GET_ALL_TICKETS;
    payload: IQueryParamsPayload;
}

export interface ISetTikets {
    type: TicketsActionsTypes.SET_ALL_TICKETS;
    payload: { data: ISetTicketsPayload[]; count: number };
}
export interface IDeleteTiket {
    type: TicketsActionsTypes.SET_ALL_TICKETS;
    payload: { ticketID: string; query: IQueryParamsPayload };
}
export interface ICreateTicketAction {
    type: TicketsActionsTypes.CREATE_TICKET;
    payload: ICreateTicketActionPayload;
}
export interface IChangeTicketStatusPayload {
    ticketID: string;
    ticketStatus: string;
}
export interface IAddNewCommentActionPayload {
    ticketID?: string;
    subject?: string;
    destination?: string;
    text?: string;
}
export interface IChangeTicketStatus {
    type: TicketsActionsTypes.CHANGE_TICKET_STATUS;
    payload: IChangeTicketStatusPayload;
}
export interface IGetTicketByIDStatus {
    type: TicketsActionsTypes.GET_TICKET_BY_ID;
    payload: string;
}
export interface ISetTicketByIDStatus {
    type: TicketsActionsTypes.SET_TICKET;
    payload: ISetTicketsPayload;
}
export interface IAddNewCommentActions {
    type: TicketsActionsTypes.ADD_NEW_COMMENT;
    payload: IAddNewCommentActionPayload;
}

export type TiketsActions = ISetTikets | ISetTicketByIDStatus;
