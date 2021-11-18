import { History } from 'history';

export enum AuthActionsTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESET = 'RESET',
    RESET_PASSWORD = 'RESET_PASSWORD',
    REGISTER_CORFIRM = 'REGISTER_CORFIRM'
}

//LOGIN
export interface ILoginPayload {
    email: string;
    password: string;
}
export interface ILogin {
    value: ILoginPayload;
    history: History;
}
export interface ILoginAction {
    type: AuthActionsTypes.LOGIN;
    payload: ILogin;
}

//REGISTER
export interface IRegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname?: string;
    phone?: string;
    birthday?: string;
}

export interface IRegister {
    value: IRegisterPayload;
    history?: any;
}

export interface IRegisterAction {
    type: AuthActionsTypes.REGISTER;
    payload: IRegister;
}

export interface IConfirmRegisterPayload {
    token?: string;
}

export interface IConfirmRegisterAction {
    type: AuthActionsTypes.REGISTER_CORFIRM;
    payload: IConfirmRegisterPayload;
}

//RESET
export interface IReset {
    email: string;
}

export interface IResetAction {
    type: AuthActionsTypes.RESET;
    payload: IReset;
}

//RESET_PASSWORD

export interface IResetFormValues {
    newPassword: string;
    newPasswordConfirm: string;
}

export interface IResetPasswordPayload {
    value: IResetFormValues;
    token: string;
}

export interface IResetPasswordAction {
    type: AuthActionsTypes.RESET_PASSWORD;
    payload: IResetPasswordPayload;
}

export type AuthActions = ILoginAction | IRegisterAction | IResetAction | IResetPasswordAction;
