import { ModalActionsTypes } from '@redux/types/modal';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const setModalStatusAction = actionGenerator<boolean>(ModalActionsTypes.MODAL_STATUS);
export const setModalMessageAction = actionGenerator<string>(ModalActionsTypes.MODAL_MESSAGE);
