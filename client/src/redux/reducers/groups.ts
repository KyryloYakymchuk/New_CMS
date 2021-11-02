import {
    GroupsActionTypes,
    IGroupsActions,
    IGroupsInitialState
} from '@redux/types/groups';

const initialState: IGroupsInitialState = {};

const groups = (
    state = initialState,
    action: IGroupsActions
): IGroupsInitialState => {
    switch (action.type) {
        case GroupsActionTypes.SET_GROUPS:
            return {
                ...state,
                allGroups: action.payload
            };
        case GroupsActionTypes.SET_GROUP_NAMES:
            return {
                ...state,
                groupNames: action.payload
            };
        default:
            return state;
    }
};

export default groups;
