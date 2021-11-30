import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { InputAdornment, TextField } from '@mui/material';

import { Icons } from '@utils/constants/icon';
import { formatDate } from '@utils/functions/datepicker';
import { useStyles } from '@utils/styles/field';

interface IDatePickerFormProps {
    toggleShowDatepicker: () => void;
    label?: string;
    monthData: Date;
}

export const DatePickerField: FC<IDatePickerFormProps> = ({
    toggleShowDatepicker,
    label,
    monthData
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TextField
            disabled
            className={classes.root}
            name="date"
            type="text"
            label={t('Date')}
            value={label}
            placeholder={formatDate(monthData)}
            onClick={toggleShowDatepicker}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icons.TodayIcon />
                    </InputAdornment>
                )
            }}
        />
    );
};
