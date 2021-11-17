import {
    UserActionTypes,
    IDeleteUserData,
    IUser,
    IGetUsersData,
    IUserListData
} from '@redux/types/users';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const getUsers = actionGenerator<IGetUsersData>(UserActionTypes.GET_USERS);
export const setUsers = actionGenerator<IUserListData[]>(UserActionTypes.SET_USERS);
export const deleteUsers = actionGenerator<IDeleteUserData>(UserActionTypes.DELETE_USER);
export const setCurrentUser = actionGenerator<IUser>(UserActionTypes.SET_CURRENT_USERS);
export const clearCurrentUser = actionGenerator<undefined>(UserActionTypes.CLEAR_CURRENT_USERS);
export const addNewUser = actionGenerator<IUser>(UserActionTypes.ADD_NEW_USER);
export const editUser = actionGenerator<IUser>(UserActionTypes.EDIT_USER);
export const editUserImg = actionGenerator<FormData>(UserActionTypes.EDIT_USER_IMG);

