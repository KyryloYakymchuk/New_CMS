import { put, takeEvery, call } from '@redux-saga/core/effects';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { setModulesAction } from '@redux/actions/modules';
import {
    ICreateModuleAction,
    IDeleteModuleAction,
    IGetModuleAction,
    ModulesActionTypes
} from '@redux/types/modules';
import request from 'axios';

import {
    createModulesReqApi,
    deleteModulesReqApi,
    editModulesReqApi,
    getModulesReqApi
} from '@api/modules';
import { IError } from '@redux/types/error';

function* getModulesReq(config: IGetModuleAction) {
    try {
        const { data } = yield call(getModulesReqApi, config);
        yield put(setModulesAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
    yield put(loaderAction(false));
}

function* deleteModulesReq(config: IDeleteModuleAction) {
    try {
        const { data } = yield call(deleteModulesReqApi, config);
        yield put(setModulesAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* createModulesReq(config: ICreateModuleAction) {
    const { history } = config.payload;
    try {
        const { data } = yield call(createModulesReqApi, config);
        yield put(setModulesAction(data));
        history?.push('/modules');
        yield put(errorAction());
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

function* editModulesReq(config: ICreateModuleAction) {
    const { history } = config.payload;
    try {
        const { data } = yield call(editModulesReqApi, config);
        yield put(setModulesAction(data));
        history?.push('/modules');
        yield put(errorAction());
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

export function* modulesWatcher() {
    yield takeEvery(ModulesActionTypes.GET_MODULES, getModulesReq);
    yield takeEvery(ModulesActionTypes.DELETE_MODULE, deleteModulesReq);
    yield takeEvery(ModulesActionTypes.CREATE_MODULE, createModulesReq);
    yield takeEvery(ModulesActionTypes.EDIT_MODULE, editModulesReq);
}
