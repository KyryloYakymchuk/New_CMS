import { ICreateFieldProps } from '@interfaces/types';
import {
    IGetModulePayload,
    ISetModulePayload,
    ModulesActionTypes,
    IDeleteModulePayload,
    ICreateModulePayload,
    IDeleteFieldModulePayload,
    IFieldResponse,
    IModuleField,
    IDeleteModuleItemsPayload,
    IModuleItemRequestData,
    IGetModuleItemsPayload,
    IEditFieldOrderPayload,
    IModuleFieldsPayload
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

export const editFieldModuleAction = actionGenerator<ICreateFieldProps>(
    ModulesActionTypes.EDIT_FIELD_MODULE
);
export const editFieldOrderAction = actionGenerator<IEditFieldOrderPayload>(
    ModulesActionTypes.EDIT_ORDER_FIELD_MODULE
);

export const setFieldDataAction = actionGenerator<IModuleField>(ModulesActionTypes.SET_FIELD_DATA);
export const getModulesItemsAction = actionGenerator<IGetModuleItemsPayload>(
    ModulesActionTypes.GET_MODULES_ITEMS
);
export const setModulesItemsAction = actionGenerator<IModuleItemRequestData>(
    ModulesActionTypes.SET_MODULES_ITEMS
);
export const deleteModuleItemAction = actionGenerator<IDeleteModuleItemsPayload>(
    ModulesActionTypes.DELETE_MODULE_ITEM
);
export const getModulesFieldsAction = actionGenerator<{ moduleName: string }>(
    ModulesActionTypes.GET_MODULES_FIELDS
);
export const setModulesFieldsAction = actionGenerator<IModuleFieldsPayload[]>(
    ModulesActionTypes.SET_MODULES_FIELDS
);

