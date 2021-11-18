import {
    GroupsActionTypes,
    IGetGroupsData,
    IGroupsInitialState
} from '@redux/types/groups';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const setGroups = actionGenerator<IGroupsInitialState>(GroupsActionTypes.SET_GROUPS);
export const getGroups = actionGenerator<IGetGroupsData>(GroupsActionTypes.GET_GROUPS);
export const setGroupNames = actionGenerator<string[]>(GroupsActionTypes.SET_GROUP_NAMES);
export const getGroupNames = actionGenerator<IGetGroupsData>(GroupsActionTypes.GET_GROUP_NAMES);

