import {
    GroupsActionTypes,
    IGetGroupsData,
    IGroupsInitialState
} from '@redux/types/groups';

export const setGroups = (payload: IGroupsInitialState) => ({
    type: GroupsActionTypes.SET_GROUPS,
    payload
});
export const getGroups = (payload: IGetGroupsData) => ({
    type: GroupsActionTypes.GET_GROUPS,
    payload
});

export const setGroupNames = (payload: string[]) => ({
    type: GroupsActionTypes.SET_GROUP_NAMES,
    payload
});
export const getGroupNames = (payload: IGetGroupsData) => ({
    type: GroupsActionTypes.GET_GROUP_NAMES,
    payload
});
