import { FC } from 'react';

import { ConfirmModalButton } from '@components/Modal/ConfirmModalButton/ConfirmModalButton';
import { SubmitModalButton } from '@components/Modal/SubmitModalButton/SubmitModalButton';

interface ModalProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
}

export const ModalButton: FC<ModalProps> = ({ handleAccept, handleClose }) => {
    return  handleClose ? (
        <ConfirmModalButton
            handleAccept={handleAccept}
            handleClose={handleClose}
        />
    ) : (
        <SubmitModalButton handleAccept={handleAccept} />
    );
   
};
