import { IError, ErrorActionsTypes, IErrorAction } from '@redux/types/error';

const initialState: IError = {
    message: ''
};

const error = (state = initialState, action: IErrorAction):IError => {
    switch (action.type) {
        case ErrorActionsTypes.ERROR_MASSEGE:
            return {
                ...state,
                message: action.payload
            };

        default:
            return state;
    }
};

export default error;
