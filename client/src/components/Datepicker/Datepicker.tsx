import { FC, useEffect, useState } from 'react';

import { IDatePickerProps, IDatePickerValue, IDaysArr } from '@interfaces/datepicker';

import { formatdDatePickerData, getDatePickedData } from '@utils/functions/datepicker';

import { DatePickerWrapper } from './styled/styled';
import { DatePickerField } from './DatePickerField';
import { Calendar } from './Calendar';

export const Datepicker: FC<IDatePickerProps> = ({ range, minDate, maxDate }) => {
    const [monthData, setMonthData] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState(
        new Date(monthData.getFullYear(), monthData.getMonth() + 1, 0).getDate()
    );
    const [datePickerData, setDatePickerData] = useState<IDaysArr[]>();
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState<IDatePickerValue>();
    const toggleShowDatepicker = () => {
        setShowDatepicker((state) => !state);
    };
    console.log(datePickerValue);

    useEffect(() => {
        setDatePickerData([
            ...formatdDatePickerData(monthData, daysInMonth),
            ...getDatePickedData(monthData, daysInMonth)
        ]);
    }, [monthData]);
    return (
        <DatePickerWrapper>
            <DatePickerField
                label={datePickerValue?.label}
                toggleShowDatepicker={toggleShowDatepicker}
                monthData={monthData}
            />

            {showDatepicker && (
                <Calendar
                    minDate={minDate}
                    maxDate={maxDate}
                    monthData={monthData}
                    datePickerValue={datePickerValue}
                    datePickerData={datePickerData}
                    setDaysInMonth={setDaysInMonth}
                    setDatePickerValue={setDatePickerValue}
                    setMonthData={setMonthData}
                    range={range}
                />
            )}
        </DatePickerWrapper>
    );
};
