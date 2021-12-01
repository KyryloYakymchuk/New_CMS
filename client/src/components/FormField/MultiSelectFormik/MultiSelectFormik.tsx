import { GetSelectDataType, IOption, OnChangeSelectType } from '@interfaces/types';
import { FieldProps } from 'formik';
import Select from 'react-select';
import { SelectBlock, multiSelectStyles, SelectTitle } from './styled';

export interface CustomSelectProps extends FieldProps<string> {
    options: IOption[];
    isMulti: boolean;
    getSelectData?: GetSelectDataType;
}

export const MultiSelectFormik = ({
    field,
    form,
    options,
    isMulti,
    getSelectData
}: CustomSelectProps) => {
    const onChange = (option: OnChangeSelectType) => {
        form.setFieldValue(
            field.name,
            isMulti
                ? (option as IOption[]).map((item: IOption) => item.value)
                : (option as IOption).value
        );
    };
    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter((option: IOption) => field.value.indexOf(option.value) >= 0)
                : options.find((option: IOption) => option.value === field.value);
        } else {
            return isMulti ? [] : '';
        }
    };

    return (
        <SelectBlock>
            <SelectTitle>{field.name}</SelectTitle>
            <Select
                name={field.name}
                value={getValue()}
                onChange={onChange}
                onInputChange={getSelectData}
                styles={multiSelectStyles}
                options={options}
                isMulti={isMulti}
            />
        </SelectBlock>
    );
};
