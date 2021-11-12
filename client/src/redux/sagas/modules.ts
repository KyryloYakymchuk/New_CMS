import { put, takeEvery, call } from '@redux-saga/core/effects';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { setModulesAction } from '@redux/actions/modules';
import { ICreateModuleAction,
    IDeleteModuleAction,
    IGetModuleAction,
    ModulesActionTypes } from '@redux/types/modules';


import { api } from '@services/api';

function* getModulesReq(data: IGetModuleAction): Generator {
    try {
        const fieldsResponse:any = yield call(api.get, '/modules/', {
            params:data.payload
        });
        yield put(setModulesAction(fieldsResponse.data));

    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
    yield put(loaderAction(false));
}

function* deleteModulesReq(data: IDeleteModuleAction): Generator {
    const { moduleID, queryParams } = data.payload;
    
    try {
        const fieldsResponse: any = yield call(api.delete, '/modules/' + moduleID, {
            params:queryParams
        });
        //!Need fix back, wrong response
        yield put(setModulesAction(fieldsResponse.data));

    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}
function* createModulesReq(data: ICreateModuleAction): Generator {
    const { categories, name, history } = data.payload;
    
    try {
        const fieldsResponse: any = yield call(api.post, '/modules/', { categories, name } );
        yield put(setModulesAction(fieldsResponse.data));
        history?.push('/modules');
        yield put(errorAction());
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}

function* editModulesReq(data: ICreateModuleAction): Generator {
    const { name, moduleID, categories, history } = data.payload;
    try {
        const fieldsResponse: any = yield call(api.put, '/modules/', {
             name,
             moduleID,
             categories
        });
        yield put(setModulesAction(fieldsResponse.data));
        history?.push('/modules');
        yield put(errorAction());
    } catch (error: any) {
        yield put(errorAction(error.response.data.message));
    }
}


export function* modulesWatcher() {
    yield takeEvery(ModulesActionTypes.GET_MODULES, getModulesReq);
    yield takeEvery(ModulesActionTypes.DELETE_MODULE, deleteModulesReq);
    yield takeEvery(ModulesActionTypes.CREATE_MODULE, createModulesReq);
    yield takeEvery(ModulesActionTypes.EDIT_MODULE, editModulesReq);
}
