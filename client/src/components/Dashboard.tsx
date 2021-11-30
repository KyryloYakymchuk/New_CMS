import { FC } from 'react';
import { Datepicker } from './Datepicker/Datepicker';

export const Dashboard: FC = () => {
    return (
        <Datepicker
            // minDate={new Date(2021, 11, 12)}
            // maxDate={new Date(2021, 11, 16)}
            range={true}
        />
    );
};
