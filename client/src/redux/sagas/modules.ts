import request from 'axios';
import { put, takeEvery, call } from '@redux-saga/core/effects';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import {
    setFieldsResponseAction,
    setModulesAction,
    setModulesFieldsAction,
    setModulesItemsAction
} from '@redux/actions/modules';
import {
    ICreateFieldModuleAction,
    ICreateModuleAction,
    IDeleteFieldModuleAction,
    IDeleteModuleAction,
    IDeleteModulesItemsAction,
    IEditFieldOrderAction,
    IGetModuleAction,
    IGetModuleItemsAction,
    IGetModulesFieldsReqAction,
    ModulesActionTypes
} from '@redux/types/modules';

import {
    createFieldModuleReqApi,
    createModulesReqApi,
    deleteFieldModuleReqApi,
    deleteModulesItemsReqApi,
    deleteModulesReqApi,
    editFieldModuleReqApi,
    editModulesReqApi,
    getModulesItemsReqApi,
    editOrderFieldModuleReqApi,
    getModulesReqApi,
    getModulesFieldsReqApi
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
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}

function* editFieldModuleReq(config: ICreateFieldModuleAction) {
    try {
        const { data } = yield call(editFieldModuleReqApi, config.payload);
        yield put(setFieldsResponseAction(data));
        yield put(setModalStatusAction(true));
        yield put(setModalMessageAction('Field edited successfuly!'));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
}
function* getModulesItems(config: IGetModuleItemsAction) {
    try {
        const { data } = yield call(getModulesItemsReqApi, config.payload);
        yield put(setModulesItemsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
    yield put(loaderAction(false));
}
function* deleteModulesItems(config: IDeleteModulesItemsAction) {
    try {
        const { data } = yield call(deleteModulesItemsReqApi, config.payload);
        yield put(setModulesItemsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
    yield put(loaderAction(false));
}

function* editOrderFieldModuleReq(config: IEditFieldOrderAction) {
    try {
        const { data } = yield call(editOrderFieldModuleReqApi, config.payload);
        yield put(setFieldsResponseAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
    yield put(loaderAction(false));
}
function* getModulesFieldsReq(config: IGetModulesFieldsReqAction) {
    try {
        const { data } = yield call(getModulesFieldsReqApi, config.payload);

        yield put(setModulesFieldsAction(data));
    } catch (error) {
        if (request.isAxiosError(error) && error.response) {
            yield put(errorAction(error.response?.data as IError));
        }
    }
    yield put(loaderAction(false));
}

export function* modulesWatcher() {
    yield takeEvery(ModulesActionTypes.GET_MODULES, getModulesReq);
    yield takeEvery(ModulesActionTypes.DELETE_MODULE, deleteModulesReq);
    yield takeEvery(ModulesActionTypes.CREATE_MODULE, createModulesReq);
    yield takeEvery(ModulesActionTypes.EDIT_MODULE, editModulesReq);
    yield takeEvery(ModulesActionTypes.DELETE_FIELD_MODULE, deleteFieldModuleReq);
    yield takeEvery(ModulesActionTypes.CREATE_FIELD_MODULE, createFieldModuleReq);
    yield takeEvery(ModulesActionTypes.EDIT_FIELD_MODULE, editFieldModuleReq);
    yield takeEvery(ModulesActionTypes.GET_MODULES_ITEMS, getModulesItems);
    yield takeEvery(ModulesActionTypes.DELETE_MODULE_ITEM, deleteModulesItems);
    yield takeEvery(ModulesActionTypes.EDIT_ORDER_FIELD_MODULE, editOrderFieldModuleReq);
    yield takeEvery(ModulesActionTypes.GET_MODULES_FIELDS, getModulesFieldsReq);

}
