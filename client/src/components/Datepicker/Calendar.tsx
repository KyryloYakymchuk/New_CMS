import { FC } from 'react';

import { IDatePickerValue, IDaysArr } from '@interfaces/datepicker';

import { DaysCalendar } from './DaysCalendar';
import { MonthCalendar } from './MonthCalendar';
import { DatePickerContainer } from './styled/styled';
import { WeekCalendar } from './WeekCalendar';

interface ICalendarProps {
    minDate?: Date;
    maxDate?: Date;
    range?: boolean;
    monthData: Date;
    datePickerValue?: IDatePickerValue;
    datePickerData?: IDaysArr[];
    setDaysInMonth: (value: number) => void;
    setDatePickerValue: (value: IDatePickerValue) => void;
    setMonthData: (value: Date) => void;
}
export const Calendar: FC<ICalendarProps> = ({
    minDate,
    maxDate,
    range,
    monthData,
    datePickerValue,
    setDaysInMonth,
    setDatePickerValue,
    setMonthData,
    datePickerData
}) => {
    return (
        <DatePickerContainer>
            <MonthCalendar
                monthData={monthData}
                setDaysInMonth={setDaysInMonth}
                setMonthData={setMonthData}
            />
            <WeekCalendar />
            <DaysCalendar
                range={range}
                monthData={monthData}
                minDate={minDate}
                maxDate={maxDate}
                datePickerValue={datePickerValue}
                setDatePickerValue={setDatePickerValue}
                datePickerData={datePickerData}
            />
        </DatePickerContainer>
    );
};
