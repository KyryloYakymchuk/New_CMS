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
    EDIT_FIELD_MODULE = 'EDIT_FIELD_MODULE',
    GET_MODULES_ITEMS = 'GET_MODULES_ITEMS',
    SET_MODULES_ITEMS = 'SET_MODULES_ITEMS',
    DELETE_MODULE_ITEM = 'DELETE_MODULE_ITEM'
}

export interface ISetModulePayload {
    _id: string;
    fields: [];
    name: string;
    moduleID: string;
}
interface IItemVariants {
    variantID: string;
    images: string[];
    order: number;
    name: string;
    status: string;
    code: string;
    quantity: number;
    werehouse: boolean;
    price: number;
    discount: number;
    tax: number;
}
export interface IItemDataComments {
    id: string;
    rating: string;
    title: string;
    description: string;
    name: string;
    likes: number;
    dislikes: number;
    avatar: string;
    date: string;
    likedUsers: string[];
}
export interface IItemData {
    publishDate: string;
    archiveDate: string;
    status: string;
    name: string;
    description: string;
    order: number;
    rating: number;
    categoryID: string;
    likedUsers: string[];
    comments: IItemDataComments[];
    itemID: string;
    shape: string;
    color: string;
    mayLike: string[];
}
export interface IModuleItemData {
    variants: IItemVariants[];
    image: string[];
    _id: string;
    itemData: IItemData;
    __v: number;
    order: number;
}
export interface IModuleItemRequestData {
    count: number;
    items: IModuleItemData[];
}

export interface IModuleListData {
    count: number;
    modules: ISetModulePayload[];
}
export interface IModuleInfo {
    moduleName: string;
}
export interface IGetModulePayload {
    limit: number;
    offset: number;
    search?: string;
}
export interface IRequestInfo {
    moduleName?: string;
    itemId?: string;
}
export interface IGetModuleItemsPayload {
    params: { offset: number; limit: number };
    moduleName?: string;
}
export interface IDeleteModuleItemsPayload {
    params: { limit: number; offset?: number };
    requestInfo: IRequestInfo;
}
export interface IQueryParams {
    queryParams: IGetModulePayload;
}

export interface IGetModuleAction {
    type: ModulesActionTypes.GET_MODULES;
    payload: IQueryParams;
}

export interface IGetModuleItemsAction {
    type: ModulesActionTypes.GET_MODULES_ITEMS;
    payload: IGetModuleItemsPayload;
}

export interface ISetModuleItemsAction {
    type: ModulesActionTypes.SET_MODULES_ITEMS;
    payload: IModuleItemRequestData;
}
export interface IDeleteModulesItemsAction {
    type: ModulesActionTypes.DELETE_MODULE_ITEM;
    payload: IDeleteModuleItemsPayload;
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
    moduleItems?: {
        count: number;
        items: IModuleItemData[];
    };
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
    | ISetFieldData
    | IGetModuleItemsAction
    | ISetModuleItemsAction
    | IDeleteModulesItemsAction;
