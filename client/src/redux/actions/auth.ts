import {
    AuthActionsTypes,
    IConfirmRegisterPayload,
    ILogin,
    IRegister,
    IReset,
    IResetPasswordPayload
} from '@redux/types/auth';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const loginAction = actionGenerator<ILogin>(AuthActionsTypes.LOGIN);
export const registerAction = actionGenerator<IRegister>(AuthActionsTypes.REGISTER);
export const resetAction = actionGenerator<IReset>(AuthActionsTypes.RESET);
export const resetPasswordAction = actionGenerator<IResetPasswordPayload>(
    AuthActionsTypes.RESET_PASSWORD
);
export const confirmRegisterdAction = actionGenerator<IConfirmRegisterPayload>(
    AuthActionsTypes.REGISTER_CORFIRM
);
