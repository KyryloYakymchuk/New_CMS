export enum UserActionTypes {
    GET_USERS = 'GET_USERS',
    SET_USERS = 'SET_USERS'
}

export interface IUser {
    birthday?: string;
    confirmed: boolean;
    email: string;
    lastname?: string;
    group?: string[];
    name: string;
    phone?: string;
    profileImg: null | string;
    registerDate?: string;
    userID: string;
    _id: string;
}

export interface IUserListData {
    count: number;
    users: IUser[];
}

export interface IGetUsersData {
    limit: number;
    offset: number;
    search?:string;
    sortField?: string | null ;
    sortParameter?: string | null ;
}

interface IQueryParams {
    queryParams : IGetUsersData;
}
export interface IGetUsersAction {
    type: UserActionTypes.GET_USERS;
    payload: IQueryParams;
}
export interface ISetUsersAction {
    type: UserActionTypes.SET_USERS;
    payload: IUserListData;
}

export interface IUsers {
    userListData?: IUserListData;
}

export type IUserActions = IGetUsersAction | ISetUsersAction;
