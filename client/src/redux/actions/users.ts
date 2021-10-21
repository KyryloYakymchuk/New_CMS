import { IGetUsersData } from './../types/users';
import { IUserListData, UserActionTypes } from '@redux/types/users';

export const getUsers = (payload: IGetUsersData) => ({
    type: UserActionTypes.GET_USERS,
    payload
});

export const setUsers = (payload: IUserListData[]) => ({
    type: UserActionTypes.SET_USERS,
    payload
});
