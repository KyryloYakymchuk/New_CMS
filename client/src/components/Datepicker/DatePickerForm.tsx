import { IDatePickerValue, IMonthData } from '@interfaces/types';
import { formateDate } from '@utils/functions/datepicker';
import { useStyles } from '@utils/styles/field';
import { FC } from 'react';

interface IDatePickerFormProps {
    handleShowDadepicker: () => void;
    onChange: (value: IDatePickerValue) => any;
    label?: string;
    monthData: IMonthData;
}

export const DatePickerForm: FC<IDatePickerFormProps> = ({
    handleShowDadepicker,
    label,
    monthData
}) => {
    const classes = useStyles();

    return (
        <input
            readOnly
            className={classes.root}
            name="date"
            type="text"
            value={label}
            placeholder={formateDate(monthData)}
            onClick={handleShowDadepicker}
        />
    );
};
