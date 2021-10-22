import { put, takeEvery, call } from '@redux-saga/core/effects';

import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { setModalStatusAction } from '@redux/actions/modal';

import {
    AuthActionsTypes,
    ILoginAction,
    IRegisterAction,
    IResetAction,
    IResetPasswordAction
} from '@redux/types/auth';

import { ProtectedRoutes } from '@utils/enums/routes';

import { api } from '@services/api';

function* loginReq(data: ILoginAction): Generator {
    const { value, history } = data.payload;
    try {
        const fieldsResponse: any = yield call(api.post, '/auth/login', value);
        window.localStorage.setItem(
            'NewCMS_accessToken',
            fieldsResponse.data.accessToken
        );
        history.push(ProtectedRoutes.DASHBOARD);
        yield put(errorAction());
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

function* registerReq(data: IRegisterAction): Generator {
    const { value } = data.payload;
    try {
        yield call(api.post, '/auth/register', value);

        yield put(setModalStatusAction(true));

        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

function* resetReq(data: IResetAction): Generator {
    const { email } = data.payload;
    try {
        yield call(api.post, '/auth/password', { email: email });
        yield put(setModalStatusAction(true));

        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

function* resetPasswordReq(data: IResetPasswordAction): Generator {
    const { val } = data.payload;

    try {
        yield call(api.post, '/auth/password/confirm', { ...val });
        yield put(setModalStatusAction(true));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

export function* authWatcher() {
    yield takeEvery(AuthActionsTypes.LOGIN, loginReq);
    yield takeEvery(AuthActionsTypes.REGISTER, registerReq);
    yield takeEvery(AuthActionsTypes.RESET, resetReq);
    yield takeEvery(AuthActionsTypes.RESET_PASSWORD, resetPasswordReq);
}