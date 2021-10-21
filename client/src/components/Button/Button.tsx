import { Button } from '@mui/material';
import { useStyles } from '@utils/styles/button';

import { FC } from 'react';
import { ButtonContainer } from './styled/styled';

interface IProps {
    title: string;
    type: string; 
}

export const Buttons: FC<IProps> = ({ title, type }) => {
    const styles = useStyles();

    return (
        <ButtonContainer className={styles[type as keyof typeof styles]}>
            <Button size="large" color="inherit" variant="contained" type="submit">
                {title}
            </Button>
        </ButtonContainer>
    );
};
