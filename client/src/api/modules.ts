import {
    IModuleListData,
    IDeleteFieldModulePayload,
    ICreateModulePayload,
    IDeleteModulePayload,
    IQueryParams
} from './../redux/types/modules';
import { api } from '@services/api';
import { ICreateFieldProps } from '@interfaces/types';

export const getModulesReqApi = (payload: IQueryParams): Promise<IModuleListData> => {
    return api.get('/modules/', {
        params: payload
    });
};
export const deleteModulesReqApi = (payload: IDeleteModulePayload): Promise<IModuleListData> => {
    const { moduleID, queryParams } = payload;
    return api.delete('/modules/' + moduleID, {
        params: queryParams
    });
};
export const createModulesReqApi = (payload: ICreateModulePayload): Promise<IModuleListData> => {
    const { categories, name } = payload;
    return api.post('/modules/', { categories, name });
};
export const editModulesReqApi = (payload: ICreateModulePayload): Promise<IModuleListData> => {
    const { name, moduleID, categories } = payload;
    return api.post('/modules/', {
        name,
        moduleID,
        categories
    });
};

export const deleteFieldModuleReqApi = (
    payload: IDeleteFieldModulePayload
): Promise<IModuleListData> => {
    const { fieldId } = payload;
    return api.delete('/modules/fields/' + fieldId);
};

export const createFieldModuleReqApi = (payload: ICreateFieldProps): Promise<IModuleListData> => {
    return api.post('/modules/fields/', payload);
};

export const editFieldModuleReqApi = (payload: ICreateFieldProps): Promise<IModuleListData> => {
    return api.put('/modules/fields/', payload);
};
