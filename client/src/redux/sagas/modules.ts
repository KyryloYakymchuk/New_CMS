import request from 'axios';
import { put, takeEvery, call } from '@redux-saga/core/effects';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { setFieldsResponseAction, setModulesAction } from '@redux/actions/modules';
import {
    ICreateFieldModuleAction,
    ICreateModuleAction,
    IDeleteFieldModuleAction,
    IDeleteModuleAction,
    IGetModuleAction,
    ModulesActionTypes
} from '@redux/types/modules';

import {
    createFieldModuleReqApi,
    createModulesReqApi,
    deleteFieldModuleReqApi,
    deleteModulesReqApi,
    editModulesReqApi,
    getModulesReqApi
} from '@api/modules';
import { IError } from '@redux/types/error';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';
import { setModalMessageAction, setModalStatusAction } from '@redux/actions/modal';

function* getModulesReq(config: IGetModuleAction) {
    try {
        const { data } = yield call(getModulesReqApi, config.payload);
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
        const { data } = yield call(deleteModulesReqApi, config.payload);
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
        const { data } = yield call(createModulesReqApi, config.payload);
        yield put(setModulesAction(data));
        history?.push(ProtectedRoutes.MODULES);
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
        const { data } = yield call(editModulesReqApi, config.payload);
        yield put(setModulesAction(data));
        history?.push(ProtectedRoutes.MODULES);
        yield put(errorAction());
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* deleteFieldModuleReq(config: IDeleteFieldModuleAction) {
    try {
        const { data } = yield call(deleteFieldModuleReqApi, config.payload);
        yield put(setFieldsResponseAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* createFieldModuleReq(config: ICreateFieldModuleAction) {
    try {
        const { data } = yield call(createFieldModuleReqApi, config.payload);
        yield put(setFieldsResponseAction(data));
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('Field created successfuly!'));
    } catch (error: any) {
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
    yield takeEvery(ModulesActionTypes.DELETE_FIELD_MODULE, deleteFieldModuleReq);
    yield takeEvery(ModulesActionTypes.CREATE_FIELD_MODULE, createFieldModuleReq);
}
