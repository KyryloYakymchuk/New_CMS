import {
    IModuleListData,
    IDeleteModuleAction,
    ICreateModuleAction,
    IDeleteFieldModuleAction,
    ICreateFieldModuleAction
} from './../redux/types/modules';
import { IGetModuleAction } from '@redux/types/modules';
import { api } from '@services/api';

export const getModulesReqApi = (config: IGetModuleAction): Promise<IModuleListData> => {
    return api.get('/modules/', {
        params: config.payload
    });
};
export const deleteModulesReqApi = (config: IDeleteModuleAction): Promise<IModuleListData> => {
    const { moduleID, queryParams } = config.payload;
    return api.delete('/users/' + moduleID, {
        params: queryParams
    });
};
export const createModulesReqApi = (config: ICreateModuleAction): Promise<IModuleListData> => {
    const { categories, name } = config.payload;
    return api.post('/modules/', { categories, name });
};
export const editModulesReqApi = (config: ICreateModuleAction): Promise<IModuleListData> => {
    const { name, moduleID, categories } = config.payload;
    return api.post('/modules/', {
        name,
        moduleID,
        categories
    });
};


export const deleteFieldModuleReqApi = (config: IDeleteFieldModuleAction)
: Promise<IModuleListData> => {
    const { fieldId } = config.payload;
    return api.delete('/modules/fields/' + fieldId);
};

export const createFieldModuleReqApi = (config: ICreateFieldModuleAction)
: Promise<IModuleListData> => {

console.log(config.payload);
console.log(12);

    return api.post('/modules/fields/', config.payload );
};

