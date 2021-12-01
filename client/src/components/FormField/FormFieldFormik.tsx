import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import { FieldRenderProps } from 'react-final-form';

type FormProps = FieldRenderProps<string, HTMLElement>;

const FormFieldFormik: FC<FormProps> = ({ field, children,  ...props }) => {
    return <TextField  {...field} {...props} 
    InputProps={{
        startAdornment: <InputAdornment position="start">{children}</InputAdornment>
    }}/>;
};
export default FormFieldFormik;
