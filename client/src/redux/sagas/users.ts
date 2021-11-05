import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from '@redux-saga/core/effects';
import { loaderAction } from '@redux/actions/loader';
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
    try {
        const userResponce: any = yield call(api.get, '/users/', {
            params: data.payload
        });
        //cant be typed because AxiosResponce not working
        yield put(setUsers(userResponce?.data));
    } catch (error) {
        return error;
    }
    yield put(loaderAction(false));
}
function* deleteUser(data: IDeleteUserDataAction): Generator {
    const { queryParams, userID } = data.payload;

    try {
        const userResponce: any = yield call(api.delete, '/users/' + userID, {
            params: queryParams
        });
        //cant be typed because AxiosResponce not working

        yield put(setUsers(userResponce?.data));
    } catch (error) {
        return error;
    }
}
function* addNewUser(data: IAddUserAction): Generator {
    try {
        yield call(api.post, '/users', data.payload);
    } catch (error) {
        return error;
    }
}
function* editUser(data: IEditUserAction): Generator {
    try {
        yield call(api.put, '/users', data.payload);
    } catch (error) {
        return error;
    }
}
function* editUserImg(data: any): Generator {
    //hard code request, problem in back
    try {
        yield call(api.post, '/users/img', data.payload);
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
    yield takeEvery(UserActionTypes.EDIT_USER_IMG, editUserImg);
}
