import { IOption, MultiValueType } from '@interfaces/types';

export const reduceOption = (group: IOption[] | MultiValueType) => {
    const groupArr: string[] = [];
    group.map(({ value }) => {
        groupArr.push(value);
    });
    return groupArr;
};

export const parceOption = (group: string[] | undefined) => {
    const groupObj: IOption[] = [];
    group?.forEach((element) => {
        groupObj.push({
            value: element,
            label: element[0].toUpperCase() + element.substring(1)
        });
    });
    return groupObj;
};
