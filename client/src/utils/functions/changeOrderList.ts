import { IFieldProps } from '@interfaces/types';

export const changeOrderList = (
    fields: IFieldProps[],
    startIndex: number,
    endIndex: number
): IFieldProps[] => {
    const result = Array.from(fields);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
