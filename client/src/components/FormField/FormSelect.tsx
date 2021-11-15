import { IFieldSelectSettings } from '@interfaces/types';
import { Select, SelectContainer } from '@modules/Settings/styled/styled';
import { FC } from 'react';
import { FieldRenderProps } from 'react-final-form';


type FormProps = FieldRenderProps<string, HTMLElement>;


export const FormSelect: FC<FormProps> = ({ input, options, rest }) => {
        return (
            <SelectContainer>
                <label>{input.name}-</label>
                <Select 
                     {...rest}
                     {...input}
                >
                    {options?.map(({ value, id }:IFieldSelectSettings) => (
                        <option key={id} value={value}>
                            {value} 
                        </option>
                    ))}
                </Select>
            </SelectContainer>
        );
};