import { FC } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useStyles } from '@utils/styles/modal';
import { Text } from './styled';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@utils/hooks/useAppSelector';

interface ModalProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
    modalStatus?:boolean;
}

export const ModalConfirm: FC<ModalProps> = ({
    handleAccept,
    handleClose,
    modalStatus,
    children
}) => {
    const isModalOpen = useAppSelector(({ modal }) => modal?.modalStatus);
    const message = useAppSelector(({ modal }) => modal?.modalMessage);

    const classes = useStyles();
    const { t }  = useTranslation();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={modalStatus || isModalOpen}
            onClose={handleClose || handleAccept}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isModalOpen || modalStatus}>
                <div className={classes.paper}>
                    <Text>{message && t(message)}</Text>
                    {children}
                </div>
            </Fade>
        </Modal>
    );
};
