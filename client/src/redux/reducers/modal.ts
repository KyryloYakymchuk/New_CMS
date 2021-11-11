import {
    IModalState,
    ModalActions,
    ModalActionsTypes
} from '@redux/types/modal';

const initialState: IModalState = { modalStatus: false };

const modal = (state = initialState, action: ModalActions):IModalState => {
    switch (action.type) {
        case ModalActionsTypes.MODAL_STATUS:
            return {
                ...state,
                modalStatus: action.payload
            };
        case ModalActionsTypes.MODAL_MESSAGE:
            return {
                ...state,
                modalMessage: action.payload
            };

        default:
            return state;
    }
};

export default modal;
