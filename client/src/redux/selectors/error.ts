import { RootState } from '@redux/reducers';

export const errorMessageSelector = (state: RootState) => state.error.message;
