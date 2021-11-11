export enum UserActionTypes {
    GET_USERS = 'GET_USERS',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_USERS = 'SET_CURRENT_USERS',
    CLEAR_CURRENT_USERS = 'CLEAR_CURRENT_USERS',
    DELETE_USER = 'DELETE_USER',
    ADD_NEW_USER = 'ADD_NEW_USER',
    EDIT_USER = 'EDIT_USER',
    EDIT_USER_IMG = 'EDIT_USER_IMG'
}

export interface IUser {
    birthday?: string;
    confirmed?: boolean;
    email: string;
    lastname?: string;
    group?: string[] | { value: string; label: string };
    name: string;
    phone?: string;
    profileImg?: null | string;
    registerDate?: string;
    userID: string;
    _id: string;
}

export interface IUserListData {
    count: number;
    users?: IUser[];
}

export interface IGetUsersData {
    limit: number;
    offset: number;
    search?: string;
    sortField?: string | null;
    sortParameter?: string | null;
}
export interface IDeleteUserData {
    queryParams: IGetUsersData;
    userID?: string;
}
interface IQueryParams {
    queryParams: IGetUsersData;
}
export interface IGetUsersAction {
    type: UserActionTypes.GET_USERS;
    payload: IQueryParams;
}
export interface ISetUsersAction {
    type: UserActionTypes.SET_USERS;
    payload: IUserListData;
}
export interface IGetCurrentUsersAction {
    type: UserActionTypes.SET_CURRENT_USERS;
    payload: IUser | React.ChangeEvent<HTMLDivElement>;
}
export interface IClearCurrentUsersAction {
    type: UserActionTypes.CLEAR_CURRENT_USERS;
}
export interface IDeleteUserDataAction {
    type: UserActionTypes.DELETE_USER;
    payload: IDeleteUserData;
}

export interface IAddUserAction {
    type: UserActionTypes.ADD_NEW_USER;
    payload: IUser;
}
export interface IEditUserAction {
    type: UserActionTypes.EDIT_USER;
    payload: IUser;
}

export interface IUsers {
    userListData?: IUserListData;
    currentUserData?: IUser | React.ChangeEvent<HTMLDivElement>;
}

export type IUserActions =
    | IGetUsersAction
    | ISetUsersAction
    | IGetCurrentUsersAction
    | IClearCurrentUsersAction
    | IDeleteUserDataAction;
