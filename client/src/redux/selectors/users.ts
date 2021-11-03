import { RootState } from '@redux/reducers';

export const currentUserDataSelector = (state: RootState) => state.users.currentUserData;
export const userListDataSelector = (state: RootState) => state.users.userListData;
