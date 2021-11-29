import { FC } from 'react';
import { Datepicker } from './Datepicker/Datepicker';

export const Dashboard: FC = () => {
    return (
        <Datepicker
            rangeDate={{ minDate: '1-12-2021', maxDate: '16-12-2021' }}
            range={false}
            startOnCurrent={true}
        />
    );
};
