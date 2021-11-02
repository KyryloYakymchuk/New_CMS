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
export type GetSelectDataType = (newValue: string, actionMeta?: InputActionMeta) => void;
export type OnChangeMultiValueType = (
    newValue: MultiValue<{ label: string; value: string }>
) => void;
export type MultiValueType = MultiValue<{ label: string; value: string }>;
