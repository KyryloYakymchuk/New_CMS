import { Button } from '@mui/material';
import { useStyles } from '@utils/styles/button';
import { FC } from 'react';

interface IProps {
    title: string;
    type: string;
    style: string;
    onClickFunction?: VoidFunction;
    icon?: JSX.Element;
}

export const Buttons: FC<IProps> = ({ title, type, onClickFunction, icon, style }) => {
    const styles = useStyles();

    return (
        <div className={styles[style as keyof typeof styles]}>
            <Button
                onClick={onClickFunction}
                startIcon={icon}
                size="large"
                color="inherit"
                variant="contained"
                type={type === 'submit' ? 'submit' : 'button'}
            >
                {title}
            </Button>
        </div>
    );
};
