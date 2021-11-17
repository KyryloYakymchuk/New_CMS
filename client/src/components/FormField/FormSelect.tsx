import { IFieldSelectSettings } from '@interfaces/types';
import { Label } from '@modules/Modules/styled';
import { Select, SelectContainer } from '@modules/Settings/styled/styled';
import { FC } from 'react';
import { FieldRenderProps } from 'react-final-form';

type FormProps = FieldRenderProps<string, HTMLElement>;

export const FormSelect: FC<FormProps> = ({ input, label, options }) => {
    return (
        <SelectContainer>
            <Label>{label}</Label>
            <div>
                <Select {...input}>
                    {options?.map(({ value, id }: IFieldSelectSettings) => (
                        <option key={id} value={value}>
                            {value}
                        </option>
                    ))}
                </Select>
            </div>
        </SelectContainer>
    );
};
