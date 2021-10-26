import TextField from '@mui/material/TextField';
import { FieldRenderProps } from 'react-final-form';
import { FC } from 'react';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

import { InputAdornment } from '@mui/material';

type FormProps = FieldRenderProps<string, any>;

const FormField: FC<FormProps> = ({ input, meta, children, ...rest }) => {
    const errorMessage = useTypedSelector(({ error }) => error.message);
    console.log({ ...rest });
    
    const { touched, error } = meta;
    return (
        <TextField
            error={Boolean((touched && error) || errorMessage)}
            helperText={touched && error && <span> {error} </span>}
            {...rest}
            {...input}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{children}</InputAdornment>
                )
            }}
        />
    );
};
export default FormField;
