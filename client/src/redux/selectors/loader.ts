import { RootState } from '@redux/reducers';

export const loaderStatusSelector = (state: RootState) => state.loader.loaderStatus;
