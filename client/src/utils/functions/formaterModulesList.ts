import { ISetModulePayload } from '@redux/types/modules';

export const formaterModulesList = (data: ISetModulePayload[]) =>
    data.map((i: ISetModulePayload) => ({
        optionLabel: i.name,
        value: i.name
    }));
