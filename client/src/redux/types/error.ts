export enum ErrorActionsTypes {
    ERROR_MASSEGE = 'ERROR_MASSEGE'
}

export interface IError {
    message: string;
    statusCode?: number;
}

export interface IErrorAction {
    type: ErrorActionsTypes.ERROR_MASSEGE;
    payload: string;
}

export type ErrorActions = IErrorAction;
