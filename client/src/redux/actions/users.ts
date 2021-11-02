import {
    IUserListData,
    UserActionTypes,
    IGetUsersData,
    IDeleteUserData,
    IUser
} from '@redux/types/users';

export const getUsers = (payload: IGetUsersData) => ({
    type: UserActionTypes.GET_USERS,
    payload
});

export const setUsers = (payload: IUserListData[]) => ({
    type: UserActionTypes.SET_USERS,
    payload
});
export const deleteUsers = (payload: IDeleteUserData) => ({
    type: UserActionTypes.DELETE_USER,
    payload
});

export const setCurrentUser = (payload: React.ChangeEvent<HTMLDivElement>) => ({
    type: UserActionTypes.SET_CURRENT_USERS,
    payload
});
export const clearCurrentUser = () => ({
    type: UserActionTypes.CLEAR_CURRENT_USERS
});

export const addNewUser = (payload: IUser) => ({
    type: UserActionTypes.ADD_NEW_USER,
    payload
});
export const editUser = (payload: IUser) => ({
    type: UserActionTypes.EDIT_USER,
    payload
});
