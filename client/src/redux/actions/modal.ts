import { ModalActionsTypes } from '@redux/types/modal';

export const setModalStatusAction = (payload: boolean) => ({
    type: ModalActionsTypes.MODAL_STATUS,
    payload
});


export const setModalMessageAction = (payload: string) => ({
    type: ModalActionsTypes.MODAL_MESSAGE,
    payload
});
