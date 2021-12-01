import { IOption } from '@interfaces/types';

export const parserOption = (values: string, labels: string) => {
    const valuesArr = values?.split(',');
    const labelsArr = labels?.split(',');
    const optionsArr: IOption[] = [];
    for (let i = 0; i < valuesArr?.length; i++ ) {
        optionsArr.push({ value: valuesArr[i], label: labelsArr[i] });
    }
    return optionsArr;
};
