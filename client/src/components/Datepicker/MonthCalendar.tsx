import { FC } from 'react';

import { Icons } from '@utils/constants/icon';
import { getCurrentDate } from '@utils/functions/datepicker';

import { Month, MonthAction, MonthActionItem, MontName, Year } from './styled/styled';

interface IMonthProps {
    setDaysInMonth: (value: number) => void;
    setMonthData: (value: Date) => void;
    monthData: Date;
}

export const MonthCalendar: FC<IMonthProps> = ({ setDaysInMonth, setMonthData, monthData }) => {
    const handleChangeMonth = (month: number) => () => {
        setDaysInMonth(new Date(monthData.getFullYear(), month + 1, 0).getDate());
        setMonthData(new Date(monthData.getFullYear(), month, monthData.getDate() - 1));
    };

    return (
        <Month>
            <MontName>
                {getCurrentDate(monthData)?.name} <Year>{monthData.getFullYear()}</Year>
            </MontName>
            <MonthAction>
                <MonthActionItem onClick={handleChangeMonth(monthData.getMonth() - 1)}>
                    <Icons.ChevronLeftIcon />
                </MonthActionItem>
                <MonthActionItem onClick={handleChangeMonth(monthData.getMonth() + 1)}>
                    <Icons.ChevronRightIcon />
                </MonthActionItem>
            </MonthAction>
        </Month>
    );
};
