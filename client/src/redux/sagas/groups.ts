import { setGroupNames } from './../actions/groups';
import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import { setGroups } from '@redux/actions/groups';
import { GroupsActionTypes, IGetGroupsDataAction } from '@redux/types/groups';
import { getGroupNamesApi, getGroupsApi } from '@api/groups';

function* getGroups(config: IGetGroupsDataAction) {
    try {
        const { data } = yield call(getGroupsApi, config.payload);
        yield put(setGroups(data));
    } catch (error) {
        return error;
    }
}
function* getGroupNames(config: IGetGroupsDataAction) {
    try {
        const { data } = yield call(getGroupNamesApi, config.payload);
        yield put(setGroupNames(data));
    } catch (error) {
        return error;
    }
}

export function* groupsWatcher() {
    yield takeEvery(GroupsActionTypes.GET_GROUPS, getGroups);
    yield takeEvery(GroupsActionTypes.GET_GROUP_NAMES, getGroupNames);
}
