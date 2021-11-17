import { FC, PropsWithChildren } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useStyles } from '@utils/styles/modal';
import { Text } from './styled';
import { useTranslation } from 'react-i18next';

interface ModalProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
    modalStatus: boolean;
    message?: string;
}

export const ModalConfirm: FC<PropsWithChildren<ModalProps>> = ({
    handleAccept,
    handleClose,
    modalStatus,
    message,
    children
}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={modalStatus}
            onClose={handleClose || handleAccept}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={modalStatus}>
                <div className={classes.paper}>
                    <Text>{message && t(message)}</Text>
                    {children}
                </div>
            </Fade>
        </Modal>
    );
};
