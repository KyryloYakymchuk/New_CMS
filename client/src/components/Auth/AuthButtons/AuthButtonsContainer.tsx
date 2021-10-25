import { useStyles } from '@utils/styles/button';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { HelperText } from './styled';


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
    const { t } = useTranslation();
    return (
        <>
            <div className={classes.Button}>
                {loaderStatus ? (Loader) : (
                    <Button
                        startIcon={buttonIcon}
                        size="large"
                        color="inherit"
                        variant="contained"
                        type="submit"
                    >
                        {t(buttonText)}
                    </Button>
                )}
            </div>
            <HelperText>
                {t(description)}
                <Link to={path}>{t(linkText)}</Link>
            </HelperText>
        </>
    );
};
