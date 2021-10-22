import { Button } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from './styled/ConfirmModalButton.module';

interface ButtonProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
}

export const ConfirmModalButton: FC<ButtonProps> = ({
    handleClose,
    handleAccept
}) => {
    const { t } = useTranslation();
    return (
        <CustomButton>
            <Button variant="contained" onClick={handleAccept}>
                {t('Yes')}    
            </Button>
            <Button variant="outlined" onClick={handleClose}>
                {t('No')}
            </Button>
        </CustomButton>
    );
};
