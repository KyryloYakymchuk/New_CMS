import { Button } from '@material-ui/core';
import { FC } from 'react';

import { CustomButton } from './styled/ConfirmModalButton.module';

interface ButtonProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
}

export const ConfirmModalButton: FC<ButtonProps> = ({
    handleClose,
    handleAccept
}) => {
    return (
        <CustomButton>
            <Button variant="contained" onClick={handleAccept}>
            Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
            No
            </Button>
        </CustomButton>
    );
};
