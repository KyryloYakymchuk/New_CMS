export enum AuthActionsTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET = "RESET",
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
  setOpenModal?: any;
}

export interface IRegisterAction {
  type: AuthActionsTypes.REGISTER;
  payload: IRegister;
}

//RESET

export interface IReset {
  email: string;
  setOpenModal?: any;
}

export interface IResetAction {
  type: AuthActionsTypes.RESET;
  payload: IReset;
}

export type AuthActions = ILoginAction | IRegisterAction | IResetAction;
