import { IUserGroups } from '@redux/types/users';
import { MouseEventHandler } from 'react';
import { InputActionMeta, MultiValue } from 'react-select';
import { History } from 'history';

export interface IAddress {
    street: string;
    city: string;
    zipcode: string;
}

export interface IUsers {
    id: number;
    name: string;
    email: string;
    address: IAddress;
}

export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

export interface IListColumns {
    title: string;
    name: string;
}

export interface IOption {
    value: string;
    label: string;
}
export interface ISingleFilterFormValue {
    search: string;
}

export interface ISortParams {
    sortField?: string;
    sortParameter?: string;
}

export interface ISortHandlerValue {
    currentSortParams: ISortParams;
    currSortingTypeIdx: number;
}
export type OnClickFuncType = (
    e: React.ChangeEvent<HTMLDivElement>
) => MouseEventHandler<HTMLDivElement>;

export interface IFieldSelectSettings {
    value?: string;
    id?: number;
    optionLabel?: string;
}

export interface IFieldSettings {
    id?: string;
    name?: string;
    type?: string;
    key?: string;
    fieldType?: string;
    title?: string;
    defaultText?: string;
    maxChars?: string;
    maxSize?: string;
    maxItems?: string;
    coordinates_x?: string;
    coordinates_y?: string;
    module?: string;
    required?: string;
    fileTypes?: string;
    select?: IFieldSelectSettings[];
}

export interface ICreateFieldProps {
    history?: History;
    id?: string;
    name?: string;
    type?: string;
    key?: string;
    fieldType?: string;
    moduleID?: string;
    settings: IFieldSettings;
}

export interface IFieldProps {
    id?: string;
    name?: string;
    type?: string;
    key?: string;
    fieldType?: string;
    moduleID?: string;
    settings?: IFieldSettings[];
    validate?: (values: IFieldSettings) => IFieldSettings;
}


export type GetSelectDataType = (newValue: string, actionMeta?: InputActionMeta) => void;
export type MultiValueType = IUserGroups[];
export type MultiValueSelectType = MultiValue<IUserGroups>;
export type OnChangeMultiValueType = (newValue: MultiValueType) => void;
export type OnChangeMultiSelectType = (newValue: MultiValueSelectType) => void;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnChangeFieldValueType = (e: EventChangeType) => void;
