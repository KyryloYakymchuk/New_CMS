import { IError, ErrorActionsTypes } from '@redux/types/error';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const errorAction = actionGenerator<IError>(ErrorActionsTypes.ERROR_MASSEGE);

