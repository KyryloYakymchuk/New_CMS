import { setUsers } from './../actions/users';
import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import {
    IGetUsersAction,
    UserActionTypes
} from '@redux/types/users';
import { api } from '@services/api';

function* getUsers(data: IGetUsersAction): Generator {
    const { limit, offset } = data.payload;

    try {
        const userResponce: any = yield call(api.get, '/users/', {
            params: { limit: limit, offset: offset }
        });
        //cant be typed
        yield put(setUsers(userResponce?.data));
    } catch (error) {
        return error;
    }
}

export function* usersWatcher() {
    yield takeEvery(UserActionTypes.GET_USERS, getUsers);
}
