import { IGetModulePayload,
         ISetModulePayload,
         ModulesActionTypes, 
         IDeleteModulePayload, 
         ICreateModulePayload
        } from '@redux/types/modules';

export const getModulesAction = (payload: IGetModulePayload) => ({
    type: ModulesActionTypes.GET_MODULES,
    payload
});

export const setModulesAction = (payload: ISetModulePayload) => ({
    type: ModulesActionTypes.SET_MODULES,
    payload
});


export const deleteModuleAction = (payload: IDeleteModulePayload) => ({
    type: ModulesActionTypes.DELETE_MODULE,
    payload
});

export const createModuleAction = (payload: ICreateModulePayload) => ({
    type: ModulesActionTypes.CREATE_MODULE,
    payload
});


export const setEditDataModuleAction = (payload: ICreateModulePayload) => ({
    type: ModulesActionTypes.SET_EDIT_DATA_MODULE,
    payload
});

export const editModuleAction = (payload: ICreateModulePayload) => ({
    type: ModulesActionTypes.EDIT_MODULE,
    payload
});

