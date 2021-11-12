import { setGroupNames } from './../actions/groups';
import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import { setGroups } from '@redux/actions/groups';
import { GroupsActionTypes, IGetGroupsDataAction } from '@redux/types/groups';
import { api } from '@services/api';

function* getGroups(data: IGetGroupsDataAction): Generator {
    try {
        const groupResponce: any = yield call(api.get, '/groups/', {
            params: data?.payload
        });
        //cant be typed because AxiosResponce not working
        yield put(setGroups(groupResponce?.data));
    } catch (error) {
        return error;
    }
}
function* getGroupNames(data: IGetGroupsDataAction): Generator {
    try {
        const groupResponce: any = yield call(api.get, '/groups/select-data', {
            params: data.payload
        });
        //cant be typed because AxiosResponce not working
        yield put(setGroupNames(groupResponce?.data));
    } catch (error) {
        return error;
    }
}

export function* groupsWatcher() {
    yield takeEvery(GroupsActionTypes.GET_GROUPS, getGroups);
    yield takeEvery(GroupsActionTypes.GET_GROUP_NAMES, getGroupNames);
}
