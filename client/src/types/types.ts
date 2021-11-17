import { IUserGrouops } from '@redux/types/users';
import { MouseEventHandler } from 'react';
import { InputActionMeta, MultiValue } from 'react-select';
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

export type GetSelectDataType = (newValue: string, actionMeta?: InputActionMeta) => void;
export type MultiValueType = IUserGrouops[];
export type MultiValueSelectType = MultiValue<IUserGrouops>;
export type OnChangeMultiValueType = (newValue: MultiValueType) => void;
export type OnChangeMultiSelectType = (newValue: MultiValueSelectType) => void;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnChangeFieldValueType = (e: EventChangeType) => void;
