import { useStyles } from '@utils/styles/button';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HelperText } from './../styled/styled';
import { Button } from '@mui/material';

interface ButtonProps {
    buttonText: string;
    buttonIcon: JSX.Element;
    Loader?: JSX.Element;
    linkText: string;
    description: string;
    path: string;
    loaderStatus?: boolean;
}

export const AuthButtonContainer: FC<ButtonProps> = ({
    buttonText,
    buttonIcon,
    Loader,
    linkText,
    description,
    path,
    loaderStatus
}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.Button}>
                {loaderStatus ? (
                    Loader
                ) : (
                    <Button
                        startIcon={buttonIcon}
                        size="large"
                        color="inherit"
                        variant="contained"
                        type="submit"
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
            <HelperText>
                {description}
                <Link to={path}>{linkText}</Link>
            </HelperText>
        </>
    );
};
