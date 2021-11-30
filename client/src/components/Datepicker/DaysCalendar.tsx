import { FC } from 'react';

import { IDatePickerValue, IDaysArr } from '@interfaces/datepicker';

import {
    createDateLabel,
    isCurrentDay,
    isDateRange,
    isBefore 
} from '@utils/functions/datepicker';

import { Day, Days } from './styled/styled';

interface IDaysProps {
    minDate?: Date;
    maxDate?: Date;
    range?: boolean;
    monthData: Date;
    datePickerValue?: IDatePickerValue;
    setDatePickerValue: (value: IDatePickerValue) => void;
    datePickerData?: IDaysArr[];
}

export const DaysCalendar: FC<IDaysProps> = ({
    monthData,
    minDate,
    maxDate,
    range,
    datePickerValue,
    setDatePickerValue,
    datePickerData
}) => {
    //! wp
    console.log(range);

    const handlePickDate = (value: Date) => () => {
        const pickedDateFrom: IDatePickerValue = {
            label: createDateLabel(value, monthData),
            dateFrom: value
        };
        if (value > new Date()) {
            if (!datePickerValue?.dateFrom) {
                if (minDate) {
                    if (minDate <= value) {
                        setDatePickerValue(pickedDateFrom);
                    }
                    return;
                } else {
                    setDatePickerValue(pickedDateFrom);
                    return;
                }
            }
            if (value < datePickerValue?.dateFrom) {
                setDatePickerValue(pickedDateFrom);
                return;
            }
            if (!datePickerValue?.dateTo) {
                if (maxDate) {
                    if (maxDate >= value) {
                        setDatePickerValue({
                            ...datePickerValue,
                            label: createDateLabel(value, monthData, datePickerValue.label),
                            dateTo: value
                        });
                    }
                } else {
                    setDatePickerValue({
                        ...datePickerValue,
                        label: createDateLabel(value, monthData, datePickerValue.label),
                        dateTo: value
                    });
                }
            } else {
                setDatePickerValue(pickedDateFrom);
            }
        }
    };

    return (
        <Days>
            {datePickerData?.map(({ key, value }: IDaysArr, index) => (
                <Day
                    onClick={handlePickDate(value)}
                    key={index}
                    pickerPosition={key}
                    datePickerValue={isDateRange(value, datePickerValue)}
                    yesrerday={isBefore(value, datePickerValue)}
                    today={isCurrentDay(value)}
                >
                    {key}
                </Day>
            ))}
        </Days>
    );
};
