import TextField from '@mui/material/TextField';
import { FC } from 'react';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { InputAdornment } from '@mui/material';
import { errorMessageSelector } from '@redux/selectors/error';
import { FieldRenderProps } from 'react-final-form';
import { OnChangeFieldValueType } from '@interfaces/types';

interface IProps extends FieldRenderProps<string, HTMLElement> {
    filterFormValue: string;
    onChangeFieldValue: OnChangeFieldValueType;
}

const ControlledFormField: FC<IProps> = ({
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
