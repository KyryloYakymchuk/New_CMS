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

export type GetSelectDataType = (newValue: string, actionMeta?: InputActionMeta) => void;
export type MultiValueType = MultiValue<IOption>;
export type OnChangeMultiValueType = (newValue: MultiValueType) => void;
export type EventChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnChangeFieldValueType = (e: EventChangeType) => void;
