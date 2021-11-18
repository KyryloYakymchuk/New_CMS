import { ISetModulePayload } from '@redux/types/modules';

export const formaterModulesList = (data: ISetModulePayload[]) => {
    const formatedData = data.map((i: ISetModulePayload) => ({
        optionLabel: i.name,
        value: i.name
    }));
    return formatedData;
};
