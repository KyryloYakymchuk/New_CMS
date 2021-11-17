import { GetSelectDataType, IOption, OnChangeMultiValueType } from '@interfaces/types';
import React, { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SelectBlock, multiSelectStyles, SelectTitle } from './styled';

interface IMultiSelect {
    options: IOption[];
    input: PropsWithChildren<IMultiSelect>;
    children?: React.ReactNode;
    selectName: string;
    getSelectData?: GetSelectDataType;
    onChangeMultiValue?: OnChangeMultiValueType;
    selectGroupArr: IOption[];
    placeholderName?: string;
}

export const MultiSelect: FC<IMultiSelect> = ({
    options,
    input,
    selectName,
    placeholderName,
    getSelectData,
    onChangeMultiValue,
    selectGroupArr,
    ...rest
}) => {
    const { t } = useTranslation();
    return (
        <SelectBlock>
            <SelectTitle>{selectName}</SelectTitle>
            <Select
                {...rest}
                {...input}
                // onChange={onChangeMultiValue}
                isLoading={true}
                onInputChange={getSelectData}
                styles={multiSelectStyles}
                value={selectGroupArr}
                options={options}
                placeholder={`${t('Select')} ${placeholderName}`}
                noOptionsMessage={() => `${t('No items')}`}
                isMulti={true}
            />
        </SelectBlock>
    );
};
