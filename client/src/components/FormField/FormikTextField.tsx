import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { useField } from 'formik';

interface ITextFieldFormik {
    name: string;
    label?: string;
}

const FormikTextField: FC<ITextFieldFormik> = ({ name, children, ...rest }) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error && <span> {meta.error} </span>}
            {...field}
            {...rest}
            InputProps={{
                startAdornment: <InputAdornment position="start">{children}</InputAdornment>
            }}
        />
    );
};
export default FormikTextField;
