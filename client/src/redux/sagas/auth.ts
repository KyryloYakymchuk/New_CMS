import request from 'axios';
import { put, takeEvery, call } from '@redux-saga/core/effects';

import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { setModalMessageAction, setModalStatusAction } from '@redux/actions/modal';

import {
    AuthActionsTypes,
    IConfirmRegisterAction,
    ILoginAction,
    IRegisterAction,
    IResetAction,
    IResetPasswordAction
} from '@redux/types/auth';

import { ProtectedRoutes } from '@utils/enums/RoutesPath';

import { api } from '@services/api';
import { tokenServise } from '@services/tokenServise';
import { loginReqApi } from '@api/auth';
import { IError } from '@redux/types/error';

function* loginReq(config: ILoginAction) {
    const { history } = config.payload;
    try {
        const { data } = yield call(loginReqApi, config);
        yield tokenServise.setToken(data.accessToken);
        yield put(errorAction());
        history.push(ProtectedRoutes.DASHBOARD);
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

function* registerReq(config: IRegisterAction) {
    try {
        yield call(api.post, '/auth/register', config.payload.value);
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('A confirmation letter has been sent to the Email !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
        yield put(loaderAction(false));
    }
}

function* resetReq(data: IResetAction) {
    const { email } = data.payload;
    try {
        yield call(api.post, '/auth/password', { email: email });
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('A confirmation letter has been sent to the Email !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error) {
        yield put(loaderAction(false));
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

function* resetPasswordReq(data: IResetPasswordAction) {
    const { val } = data.payload;
    try {
        yield call(api.post, '/auth/password/confirm', { ...val });
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('Password reset successfully !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error) {
        yield put(loaderAction(false));
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

function* confirmRegisterReq(data: IConfirmRegisterAction) {
    try {
        yield call(api.post, '/auth/register/confirm', data.payload);
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('You account confirmed successfuly !'));
    } catch (error) {
        return error;
    }
}

export function* authWatcher() {
    yield takeEvery(AuthActionsTypes.LOGIN, loginReq);
    yield takeEvery(AuthActionsTypes.REGISTER, registerReq);
    yield takeEvery(AuthActionsTypes.RESET, resetReq);
    yield takeEvery(AuthActionsTypes.RESET_PASSWORD, resetPasswordReq);
    yield takeEvery(AuthActionsTypes.REGISTER_CORFIRM, confirmRegisterReq);
}
