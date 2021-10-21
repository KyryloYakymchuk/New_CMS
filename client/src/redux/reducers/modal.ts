import {
    IModalAction,
    IModalState,
    ModalActionsTypes
} from '@redux/types/modal';

const initialState: IModalState = { modal: false };

const modalStatus = (state = initialState, action: IModalAction) => {
    switch (action.type) {
        case ModalActionsTypes.MODAL_STATUS:
            return {
                ...state,
                modal: action.payload
            };

        default:
            return state;
    }
};

export default modalStatus;
