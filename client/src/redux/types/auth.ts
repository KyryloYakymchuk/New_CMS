export enum AuthActionsTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESET = 'RESET',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

//LOGIN
interface ILoginPayload {
    email: string;
    password: string;
}

export interface ILogin {
    value: ILoginPayload;
    history?: any;
}

export interface ILoginAction {
    type: AuthActionsTypes.LOGIN;
    payload: ILogin;
}

//REGISTER
interface IRegisterPayload {
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

//RESET
export interface IReset {
    email: string;
}

export interface IResetAction {
    type: AuthActionsTypes.RESET;
    payload: IReset;
}

//RESET_PASSWORD

interface IResetPasswordPayload {
    newPassword: string;
    newPasswordConfirm: string;
    token: string;
}

export interface IResetPassword {
    val: IResetPasswordPayload;
}

export interface IResetPasswordAction {
    type: AuthActionsTypes.RESET_PASSWORD;
    payload: IResetPassword;
}

export type AuthActions =
| ILoginAction
| IRegisterAction
| IResetAction
| IResetPasswordAction;