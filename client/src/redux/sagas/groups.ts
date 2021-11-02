import { setGroupNames } from './../actions/groups';
import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import { setGroups } from '@redux/actions/groups';
import { GroupsActionTypes, IGetGroupsDataAction } from '@redux/types/groups';
import { api } from '@services/api';
import { parserGroupNames } from '@utils/functions/parserGroupNames';

function* getGroups(data: IGetGroupsDataAction): Generator {
    const queryParams = data?.payload;

    try {
        const groupResponce: any = yield call(api.get, '/groups/', {
            params: queryParams
        });
        //cant be typed
        yield put(setGroups(groupResponce?.data));
    } catch (error) {
        return error;
    }
}
function* getGroupNames(data: IGetGroupsDataAction): Generator {
    const queryParams = data?.payload;

    try {
        const groupResponce: any = yield call(api.get, '/groups/', {
            params: queryParams
        });
        //cant be typed
        yield put(setGroupNames(parserGroupNames(groupResponce?.data)));
    } catch (error) {
        return error;
    }
}

export function* groupsWatcher() {
    yield takeEvery(GroupsActionTypes.GET_GROUPS, getGroups);
    yield takeEvery(GroupsActionTypes.GET_GROUP_NAMES, getGroupNames);
}
