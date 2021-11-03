import { RootState } from '@redux/reducers';

export const modalStatusSelector = (state: RootState) => state.modalStatus?.modal;
