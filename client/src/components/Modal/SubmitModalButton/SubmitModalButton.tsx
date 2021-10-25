import { Button } from '@material-ui/core';
import { FC } from 'react';

interface ButtonProps {
    handleAccept: VoidFunction;
}

export const SubmitModalButton: FC<ButtonProps> = ({ handleAccept }) => {
    return (
        <Button variant="contained" onClick={handleAccept}>
            Ok
        </Button>
    );
};
