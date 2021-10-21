import { IError, ErrorActionsTypes } from '@redux/types/error';

export const errorAction = (payload?: IError) => ({
    type: ErrorActionsTypes.ERROR_MASSEGE,
    payload
});
