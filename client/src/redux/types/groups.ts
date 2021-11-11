import { IOption } from './../../types/types';
export enum GroupsActionTypes {
    SET_GROUPS = 'SET_GROUPS',
    GET_GROUPS = 'GET_GROUPS',
    SET_GROUP_NAMES = 'SET_GROUP_NAMES',
    GET_GROUP_NAMES = 'GET_GROUP_NAMES'
}

export interface IGroupsInitialState {
    allGroups?: ISetGroupsData;
    groupNames?: { groups: IOption[] };
}

export interface IGetGroupsData {
    limit?: number;
    offset?: number;
    search?: string;
    sortField?: string | null;
    sortParameter?: string | null;
}
export interface IBoolPermission {
    add: boolean;
    delete: boolean;
    edit: boolean;
    watch: boolean;
}
export interface IGroupPermissions {
    groups: IBoolPermission;
    pages: IBoolPermission;
    users: IBoolPermission;
}
export interface IGroup {
    groupID: string;
    name: string;
    permissions: IGroupPermissions;
    __v: number;
    _id: string;
}
export interface ISetGroupsData {
    count: number;
    groups: IGroup[];
}
export interface ISetGroupsDataAction {
    type: GroupsActionTypes.SET_GROUPS;
    payload: ISetGroupsData;
}
export interface IGetGroupsDataAction {
    type: GroupsActionTypes.GET_GROUPS;
    payload: IGetGroupsData;
}
export interface ISetGroupNamesAction {
    type: GroupsActionTypes.SET_GROUP_NAMES;
    payload: { count: number; groups: IOption[] };
}
export interface IGetGroupNamesAction {
    type: GroupsActionTypes.GET_GROUP_NAMES;
    payload: IGetGroupsData;
}

export type IGroupsActions =
    | ISetGroupsDataAction
    | IGetGroupsDataAction
    | ISetGroupNamesAction
    | IGetGroupNamesAction;
