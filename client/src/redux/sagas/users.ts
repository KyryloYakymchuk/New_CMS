import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import { setUsers } from '@redux/actions/users';
import {
    IAddUserAction,
    IDeleteUserDataAction,
    IEditUserAction,
    IGetUsersAction,
    UserActionTypes
} from '@redux/types/users';
import { api } from '@services/api';

function* getUsers(data: IGetUsersAction): Generator {
    const queryParams = data.payload;
    try {
        const userResponce: any = yield call(api.get, '/users/', {
            params: queryParams
        });
        //cant be typed
        yield put(setUsers(userResponce?.data));
    } catch (error) {
        return error;
    }
}
function* deleteUser(data: IDeleteUserDataAction): Generator {
    const { queryParams, userID } = data.payload;

    try {
        const userResponce: any = yield call(api.delete, '/users/' + userID, {
            params: queryParams
        });
        //cant be typed

        yield put(setUsers(userResponce?.data));
    } catch (error) {
        return error;
    }
}
function* addNewUser(data: IAddUserAction): Generator {
    const body = data.payload;

    try {
        yield call(api.post, '/users', body);
    } catch (error) {
        return error;
    }
}
function* editUser(data: IEditUserAction): Generator {
    const body = data.payload;
    console.log(body);

    try {
        yield call(api.put, '/users', body);
    } catch (error) {
        return error;
    }
}

export function* usersWatcher() {
    yield takeEvery(UserActionTypes.GET_USERS, getUsers);
    yield takeEvery(UserActionTypes.DELETE_USER, deleteUser);
    yield takeEvery(UserActionTypes.DELETE_USER, deleteUser);
    yield takeEvery(UserActionTypes.ADD_NEW_USER, addNewUser);
    yield takeEvery(UserActionTypes.EDIT_USER, editUser);
}
