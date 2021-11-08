import { GetSelectDataType, IOption, OnChangeMultiValueType } from '@interfaces/types';
import React, { FC, PropsWithChildren } from 'react';
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
}

export const MultiSelect: FC<IMultiSelect> = ({
    options,
    input,
    selectName,
    getSelectData,
    onChangeMultiValue,
    selectGroupArr,
    ...rest
}) => {
    return (
        <SelectBlock>
            <SelectTitle>{selectName}</SelectTitle>
            <Select
                {...rest}
                {...input}
                onChange={onChangeMultiValue}
                isLoading={true}
                onInputChange={getSelectData}
                styles={multiSelectStyles}
                value={selectGroupArr}
                options={options}
                placeholder={`Select ${selectName}`}
                noOptionsMessage={() => `No ${selectName}`}
                isMulti={true}
            />
        </SelectBlock>
    );
};
