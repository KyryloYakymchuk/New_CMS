import { FC } from 'react';

import { weekDays } from '@utils/constants/Datepicker/Datepicker';

import { Day, Week } from './styled/styled';

export const WeekCalendar: FC = () => {
    return (
        <Week>
            {weekDays.map(({ day }) => (
                <Day key={day}>{day}</Day>
            ))}
        </Week>
    );
};
