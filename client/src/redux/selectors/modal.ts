import { RootState } from '@redux/reducers';

export const modalSelector = (state: RootState) => state?.modal;
export const modalMessageSelector = (state: RootState) => state?.modal.modalMessage;
export const modalStatusSelector = (state: RootState) => state?.modal.modalStatus;
