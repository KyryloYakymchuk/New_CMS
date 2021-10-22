import TextField from '@mui/material/TextField';
import { FieldRenderProps } from 'react-final-form';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

import { InputAdornment } from '@mui/material';

type FormProps = FieldRenderProps<string, any>;

const FormField: FC<FormProps> = ({ input, meta, children, ...rest }) => {
    const errorMessage = useTypedSelector(({ error }) => error.message);
    const { t } = useTranslation();
    return (
        <TextField
            error={Boolean((meta.touched && meta.error) || errorMessage)}
            helperText={meta.touched && meta.error && <span> {t(meta.error)} </span>}
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
