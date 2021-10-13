import { AuthActionsTypes, ILogin, IRegister, IReset } from "@redux/types/auth";

export const LoginAction = (payload: ILogin) => ({
  type: AuthActionsTypes.LOGIN,
  payload,
});

export const RegisterAction = (payload: IRegister) => ({
  type: AuthActionsTypes.REGISTER,
  payload,
});

export const ResetAction = (payload: IReset) => ({
  type: AuthActionsTypes.RESET,
  payload,
});
