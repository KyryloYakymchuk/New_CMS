import { History } from 'history';

export enum ModulesActionTypes {
    GET_MODULES = 'GET_MODULES',
    SET_MODULES = 'SET_MODULES',
    DELETE_MODULE = 'DELETE_MODULE',
    CREATE_MODULE = 'CREATE_MODULE',
    SET_EDIT_DATA_MODULE = 'SET_EDIT_DATA_MODULE',
    EDIT_MODULE = 'EDIT_MODULE'
}

export interface ISetModulePayload {
    _id:string;
    fields: [];
    name:string;
    moduleID:string;
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

interface IQueryParams {
    queryParams: IGetModulePayload;
}

export interface IGetModuleAction {
    type: ModulesActionTypes.GET_MODULES;
    payload: IQueryParams;
}

export interface ISetModuleAction {
    type:ModulesActionTypes.SET_MODULES;
    payload:IModuleListData;
}

export interface ICreateModulePayload {
    name?: string;
    categories?:boolean;
    moduleID?: string;
    history?: History;
    fields?:[];
}

export interface IModules {
    modules?: IModuleListData;
    editableModule?: ICreateModulePayload;
}

export interface IDeleteModulePayload {
    moduleID?:string;
    queryParams:IGetModulePayload;
}

export interface IDeleteModuleAction {
    type: ModulesActionTypes.DELETE_MODULE;
    payload: IDeleteModulePayload;
}

export interface IModuleSettings {
    required:string;
    textPrompt:string;
}

export interface IModuleField {
    id:string;
    name:string;
    order:number;
    settings:IModuleSettings;
    type:string;
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



export type IModuleActions = 
IGetModuleAction |
ISetModuleAction | 
IDeleteModuleAction |
ICreateModuleAction | 
ISetEditDataModuleAction;
