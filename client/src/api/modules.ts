import {
    IModuleListData,
    IDeleteFieldModulePayload,
    ICreateModulePayload,
    IDeleteModulePayload,
    IQueryParams,
    IGetModuleItemsPayload,
    IDeleteModuleItemsPayload,
    IModuleItemRequestData,
    IEditFieldOrderPayload
} from '@redux/types/modules';
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
    return api.put('/modules/', {
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
export const getModulesItemsReqApi = (
    payload: IGetModuleItemsPayload
): Promise<IModuleItemRequestData> => {
    const { moduleName, params } = payload;
    return api.get('/modules/items/' + moduleName, {
        params: params
    });
};
export const deleteModulesItemsReqApi = (
    payload: IDeleteModuleItemsPayload
): Promise<IModuleItemRequestData> => {
    const { requestInfo, params } = payload;
    return api.delete('/modules/item/' + `${requestInfo.moduleName}'/'${requestInfo.itemId}`, {
        params: params
    });
};
export const editOrderFieldModuleReqApi = (
    payload: IEditFieldOrderPayload
): Promise<ICreateModulePayload> => {
    return api.put('/modules/fields/order', payload);
};

export const getModulesFieldsReqApi = (payload: { moduleName: string }): Promise<any> => {
    return api.get('/modules/fields/' + payload.moduleName);
};
