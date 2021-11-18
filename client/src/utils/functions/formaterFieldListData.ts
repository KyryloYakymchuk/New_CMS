import { ICreateFieldProps } from '@interfaces/types';

export const formaterFieldListData = (data: ICreateFieldProps[]) => {
    const formatedData = data?.map((i: ICreateFieldProps) => ({
        title: i.settings.name,
        name: i.name,
        module: i.settings.module,
        ...i
    }));
    return formatedData;
};
