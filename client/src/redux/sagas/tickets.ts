import {
    addNewCommentApi,
    changeTicketStatusApi,
    createTicketApi,
    deleteTicketApi,
    getAllTicketsApi,
    getTicketByIDApi
} from '@api/tickets';
import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import request from 'axios';
import { setAllTicketsAction, setTicketByIDAction } from '@redux/actions/tickets';
import {
    IAddNewCommentActions,
    IChangeTicketStatus,
    ICreateTicketAction,
    IDeleteTiket,
    IGetTicketByIDStatus,
    IGetTickets,
    TicketsActionsTypes
} from '@redux/types/tickets';
import {errorAction} from "@redux/actions/error";
import {IError} from "@redux/types/error";

function* getAllTickets(config: IGetTickets) {
    try {
        const { data } = yield call(getAllTicketsApi, config.payload);
        yield put(setAllTicketsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* deleteTicket(config: IDeleteTiket) {
    try {
        const { data } = yield call(deleteTicketApi, config.payload);
        yield put(setAllTicketsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* createTicket(config: ICreateTicketAction) {
    try {
        const { data } = yield call(createTicketApi, config.payload);
        yield put(setAllTicketsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* changeTicketStatus(config: IChangeTicketStatus) {
    try {
        yield call(changeTicketStatusApi, config.payload);
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* getTicketByID(config: IGetTicketByIDStatus) {
    try {
        const { data } = yield call(getTicketByIDApi, config.payload);
        yield put(setTicketByIDAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* addNewComment(config: IAddNewCommentActions) {
    try {
        const { data } = yield call(addNewCommentApi, config.payload);
        yield put(setTicketByIDAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

export function* ticketsWatcher() {
    yield takeEvery(TicketsActionsTypes.GET_ALL_TICKETS, getAllTickets);
    yield takeEvery(TicketsActionsTypes.DELETE_TICKET, deleteTicket);
    yield takeEvery(TicketsActionsTypes.CREATE_TICKET, createTicket);
    yield takeEvery(TicketsActionsTypes.CHANGE_TICKET_STATUS, changeTicketStatus);
    yield takeEvery(TicketsActionsTypes.GET_TICKET_BY_ID, getTicketByID);
    yield takeEvery(TicketsActionsTypes.ADD_NEW_COMMENT, addNewComment);
}
