import {
    AuthActionsTypes,
    IConfirmRegisterPayload,
    ILogin,
    IRegister,
    IReset,
    IResetPassword
} from '@redux/types/auth';

export const loginAction = (payload: ILogin) => ({
    type: AuthActionsTypes.LOGIN,
    payload
});

export const registerAction = (payload: IRegister) => ({
    type: AuthActionsTypes.REGISTER,
    payload
});

export const resetAction = (payload: IReset) => ({
    type: AuthActionsTypes.RESET,
    payload
});

export const resetPasswordAction = (payload: IResetPassword) => ({
    type: AuthActionsTypes.RESET_PASSWORD,
    payload
});


export const confirmRegisterdAction = (payload: IConfirmRegisterPayload) => ({
    type: AuthActionsTypes.REGISTER_CORFIRM,
    payload
});