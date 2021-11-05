import TextField from '@mui/material/TextField';
import { FC } from 'react';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { InputAdornment } from '@mui/material';
import { errorMessageSelector } from '@redux/selectors/error';

type FormProps = any;

const ControlledFormField: FC<FormProps> = ({
    input,
    meta,
    children,
    filterFormValue,
    onChangeFieldValue,
    ...rest
}) => {
    const errorMessage = useAppSelector(errorMessageSelector);
    const { touched, error } = meta;
    return (
        <TextField
            error={Boolean((touched && error) || errorMessage)}
            helperText={touched && error && <span> {error} </span>}
            {...rest}
            {...input}
            onChange={onChangeFieldValue}
            value={filterFormValue}
            autoComplete="off"
            InputProps={{
                startAdornment: <InputAdornment position="start">{children}</InputAdornment>
            }}
        />
    );
};
export default ControlledFormField;
