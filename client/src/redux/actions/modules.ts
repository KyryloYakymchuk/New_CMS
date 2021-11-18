import { ICreateFieldProps } from '@interfaces/types';
import {
    IGetModulePayload,
    ISetModulePayload,
    ModulesActionTypes,
    IDeleteModulePayload,
    ICreateModulePayload,
    IDeleteFieldModulePayload,
    IFieldResponse
} from '@redux/types/modules';
import { actionGenerator } from '@utils/functions/actionGenerator';

export const getModulesAction = actionGenerator<IGetModulePayload>(ModulesActionTypes.GET_MODULES);
export const setModulesAction = actionGenerator<ISetModulePayload>(ModulesActionTypes.SET_MODULES);
export const deleteModuleAction = actionGenerator<IDeleteModulePayload>(
    ModulesActionTypes.DELETE_MODULE
);
export const createModuleAction = actionGenerator<ICreateModulePayload>(
    ModulesActionTypes.CREATE_MODULE
);
export const setEditDataModuleAction = actionGenerator<ICreateModulePayload>(
    ModulesActionTypes.SET_EDIT_DATA_MODULE
);
export const editModuleAction = actionGenerator<ICreateModulePayload>(
    ModulesActionTypes.EDIT_MODULE
);
export const deleteFieldModuleAction = actionGenerator<IDeleteFieldModulePayload>(
    ModulesActionTypes.DELETE_FIELD_MODULE
);
export const setFieldsResponseAction = actionGenerator<IFieldResponse>(
    ModulesActionTypes.SET_FIELD_RESPONSE
);
export const createFieldModuleAction = actionGenerator<ICreateFieldProps>(
    ModulesActionTypes.CREATE_FIELD_MODULE
);
