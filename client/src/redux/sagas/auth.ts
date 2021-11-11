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

function* loginReq(data: ILoginAction): Generator {
    const { value, history } = data.payload;
    try {
        const fieldsResponse: any = yield call(api.post, '/auth/login', value);
        yield tokenServise.setToken(fieldsResponse.data.accessToken);
        yield put(errorAction());
        history.push(ProtectedRoutes.DASHBOARD);
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

function* registerReq(data: IRegisterAction): Generator {
    const { value } = data.payload;
    try {
        yield call(api.post, '/auth/register', value);

        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('A confirmation letter has been sent to the Email !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
        yield put(loaderAction(false));

    }
}

function* resetReq(data: IResetAction): Generator {
    const { email } = data.payload;
    try {
        yield call(api.post, '/auth/password', { email: email });
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('A confirmation letter has been sent to the Email !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
        yield put(loaderAction(false));

    }
}

function* resetPasswordReq(data: IResetPasswordAction): Generator {
    const { val } = data.payload;

    try {
        yield call(api.post, '/auth/password/confirm', { ...val });
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('Password reset successfully !'));
        yield put(errorAction());
        yield put(loaderAction(false));
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
        yield put(loaderAction(false));
        
    }
}


function* confirmRegisterReq(data: IConfirmRegisterAction): Generator {
    try {
        yield call(api.post, '/auth/register/confirm', data.payload);
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('You account confirmed successfuly !'));
    } catch (error: any) {
    }
}

export function* authWatcher() {
    yield takeEvery(AuthActionsTypes.LOGIN, loginReq);
    yield takeEvery(AuthActionsTypes.REGISTER, registerReq);
    yield takeEvery(AuthActionsTypes.RESET, resetReq);
    yield takeEvery(AuthActionsTypes.RESET_PASSWORD, resetPasswordReq);
    yield takeEvery(AuthActionsTypes.REGISTER_CORFIRM, confirmRegisterReq);

}
