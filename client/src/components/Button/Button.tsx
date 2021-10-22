import { Button } from '@mui/material';
import { useStyles } from '@utils/styles/button';

import { FC } from 'react';

interface IProps {
    title: string;
    type: string; 
}

export const Buttons: FC<IProps> = ({ title, type }) => {
    const styles = useStyles();

    return (
        <div className={styles[type as keyof typeof styles]}>
            <Button size="large" color="inherit" variant="contained" type="button">
                {title}
            </Button>
        </div>
    );
};
