import { RootState } from '@redux/reducers';

export const menuStatusSelector = (state: RootState) => state.menuReducer.status;
export const menuItemIdSelector = (state: RootState) => state.menuReducer.itemId;
