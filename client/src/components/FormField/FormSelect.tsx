import { FC } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { IFieldSelectSettings } from '@interfaces/types';

import { Label } from '@modules/Modules/styled';
import { Select, SelectContainer } from '@modules/Settings/styled/styled';
import { ErrorMessage } from '@modules/Auth/styled';

type FormProps = FieldRenderProps<string, HTMLElement>;

export const FormSelect: FC<FormProps> = ({ input, label, meta, options }) => {
    const { touched, error } = meta;
    return (
        <SelectContainer>
            <Label error={error} touched={touched}>
                {label}
            </Label>
            <div>
                <Select error={error} touched={touched} {...input}>
                    <option selected hidden>
                        Select an Option
                    </option>
                    {options.map(({ value, optionLabel, id }: IFieldSelectSettings) => (
                        <option key={id} value={value}>
                            {optionLabel}
                        </option>
                    ))}
                </Select>
                <ErrorMessage line_height="0.16">
                    {touched && error && <span> {error} </span>}
                </ErrorMessage>
            </div>
        </SelectContainer>
    );
};
