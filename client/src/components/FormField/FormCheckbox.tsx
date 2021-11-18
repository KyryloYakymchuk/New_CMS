import { FieldRenderProps } from 'react-final-form';
import { FC } from 'react';
import { Checkbox } from '@mui/material';
import { Label } from '@modules/Modules/styled';
import { PropsOf } from '@emotion/react';

type FormProps = FieldRenderProps<boolean, HTMLElement> &
    PropsOf<typeof Checkbox> & {
        label: string;
    };

const FormCheckbox: FC<FormProps> = ({ input, meta, children, ...rest }) => {
    return (
        <Label>
            {rest.label}
            <Checkbox {...rest} {...input} />
        </Label>
    );
};
export default FormCheckbox;
