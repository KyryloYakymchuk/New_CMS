import { FC, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { Label } from '@modules/Modules/styled';
import { FieldProps } from 'formik';

interface IProps extends FieldProps<string> {
    label: string;
}

export const CheckboxFormik: FC<IProps> = ({ field, label, form }) => {
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const onChangeStatus = () => {
        setCheckboxStatus(prevState => !prevState);
    };
    useEffect(() => {
        form.setFieldValue(field.name, checkboxStatus);    
    }, [checkboxStatus]);
    return (
        <Label>
            {label}
            <Checkbox {...field}  checked={checkboxStatus} onChange={onChangeStatus} />
        </Label>
    );
};
