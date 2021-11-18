import { setModalMessageAction, setModalStatusAction } from './../actions/modal';
import { deleteUserApi, getUsersApi } from '@api/users';
import { put, takeEvery, call } from '@redux-saga/core/effects';
import { loaderAction } from '@redux/actions/loader';
import { setUsers } from '@redux/actions/users';
import {
    IAddUserAction,
    IDeleteUserDataAction,
    IEditImgAction,
    IEditUserAction,
    IGetUsersAction,
    UserActionTypes
} from '@redux/types/users';
import { api } from '@services/api';

function* getUsers(config: IGetUsersAction) {
    try {
        const { data } = yield call(getUsersApi, config.payload);
        yield put(setUsers(data));
    } catch (error) {
        return error;
    }
    yield put(loaderAction(false));
}

function* deleteUser(config: IDeleteUserDataAction) {
    try {
        const { data } = yield call(deleteUserApi, config.payload);
        yield put(setUsers(data));
    } catch (error) {
        return error;
    }
    yield put(loaderAction(false));
}
function* addNewUser(config: IAddUserAction) {
    try {
        yield call(api.post, '/users', config.payload);
        yield put(setModalMessageAction('User was created'));
    } catch (error) {
        yield put(setModalMessageAction('An error occured while creating user'));
        return error;
    }
    yield put(setModalStatusAction(true));
    yield put(loaderAction(false));
}

function* editUser(config: IEditUserAction) {
    try {
        yield call(api.put, '/users', config.payload);
        yield put(setModalMessageAction('User was updated'));
    } catch (error) {
        yield put(setModalMessageAction('an error occured while updating user'));
        return error;
    }
    yield put(setModalStatusAction(true));
    yield put(loaderAction(false));
}
function* editUserImg(config: IEditImgAction) {
    try {
        yield call(api.post, '/users/img', config.payload);
    } catch (error) {
        return error;
    }
}

export function* usersWatcher() {
    yield takeEvery(UserActionTypes.GET_USERS, getUsers);
    yield takeEvery(UserActionTypes.DELETE_USER, deleteUser);
    yield takeEvery(UserActionTypes.ADD_NEW_USER, addNewUser);
    yield takeEvery(UserActionTypes.EDIT_USER, editUser);
    yield takeEvery(UserActionTypes.EDIT_USER_IMG, editUserImg);
}
