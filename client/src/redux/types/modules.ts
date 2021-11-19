import { ICreateFieldProps } from '@interfaces/types';
import { History } from 'history';

export enum ModulesActionTypes {
    GET_MODULES = 'GET_MODULES',
    SET_MODULES = 'SET_MODULES',
    DELETE_MODULE = 'DELETE_MODULE',
    CREATE_MODULE = 'CREATE_MODULE',
    SET_EDIT_DATA_MODULE = 'SET_EDIT_DATA_MODULE',
    EDIT_MODULE = 'EDIT_MODULE',
    DELETE_FIELD_MODULE = 'DELETE_FIELD_MODULE',
    SET_FIELD_RESPONSE = 'SET_FIELD_RESPONSE',
    CREATE_FIELD_MODULE = 'CREATE_FIELD_MODULE',
    SET_FIELD_DATA = 'SET_FIELD_DATA',
    EDIT_FIELD_MODULE = 'EDIT_FIELD_MODULE'
}

export interface ISetModulePayload {
    _id: string;
    fields: [];
    name: string;
    moduleID: string;
}

export interface IModuleListData {
    count: number;
    modules: ISetModulePayload[];
}

export interface IGetModulePayload {
    limit: number;
    offset: number;
    search?: string;
}

export interface IQueryParams {
    queryParams: IGetModulePayload;
}

export interface IGetModuleAction {
    type: ModulesActionTypes.GET_MODULES;
    payload: IQueryParams;
}

export interface ISetModuleAction {
    type: ModulesActionTypes.SET_MODULES;
    payload: IModuleListData;
}

export interface ICreateModulePayload {
    name?: string;
    categories?: boolean;
    moduleID?: string;
    history?: History;
    fields?: [];
}

export interface IModuleField {
    id: string;
    name: string;
    title: string;
    order: number;
    module?: string;
    settings: IModuleSettings;
    type: string;
}

export interface IModules {
    modules?: IModuleListData;
    editableModule?: ICreateModulePayload;
    editableField?: IModuleField;
}

export interface IDeleteModulePayload {
    moduleID?: string;
    queryParams: IGetModulePayload;
}

export interface IDeleteModuleAction {
    type: ModulesActionTypes.DELETE_MODULE;
    payload: IDeleteModulePayload;
}

export interface IModuleSettings {
    required: string;
    textPrompt: string;
}

export interface ICreateModuleAction {
    type: ModulesActionTypes.CREATE_MODULE;
    payload: ICreateModulePayload;
}

export interface ISetEditDataModuleAction {
    type: ModulesActionTypes.SET_EDIT_DATA_MODULE;
    payload: ICreateModulePayload;
}

export interface IEditModuleAction {
    type: ModulesActionTypes.EDIT_MODULE;
    payload: ICreateModulePayload;
}

export interface IDeleteFieldModulePayload {
    fieldId: string;
}

export interface IDeleteFieldModuleAction {
    type: ModulesActionTypes.DELETE_FIELD_MODULE;
    payload: IDeleteFieldModulePayload;
}

export interface IFieldResponse {
    fields: [];
}

export interface ISetFieldResponseAction {
    type: ModulesActionTypes.SET_FIELD_RESPONSE;
    payload: IFieldResponse;
}
export interface ICreateFieldModuleAction {
    type: ModulesActionTypes.CREATE_FIELD_MODULE;
    payload: ICreateFieldProps;
}

export interface ISetFieldData {
    type: ModulesActionTypes.SET_FIELD_DATA;
    payload: IModuleField;
}

export interface IEditFieldModuleAction {
    type: ModulesActionTypes.EDIT_FIELD_MODULE;
    payload: ICreateFieldProps;
}

export type IModuleActions =
    | IGetModuleAction
    | ISetModuleAction
    | IDeleteModuleAction
    | ICreateModuleAction
    | ISetEditDataModuleAction
    | ISetFieldResponseAction
    | IDeleteFieldModuleAction
    | ICreateFieldModuleAction
    | ISetFieldData;
