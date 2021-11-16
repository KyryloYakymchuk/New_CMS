import { FC } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useStyles } from '@utils/styles/modal';
import { Text } from './styled';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { modalMessageSelector } from '@redux/selectors/modal';

interface ModalProps {
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
    modalStatus: boolean;
    message?: string;
    children: JSX.Element;
}

export const ModalConfirm: FC<ModalProps> = ({
    handleAccept,
    handleClose,
    modalStatus,
    message,
    children
}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const requestMessage = useAppSelector(modalMessageSelector);
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
                    <Text>{message || (requestMessage && t(message || requestMessage))}</Text>
                    {children}
                </div>
            </Fade>
        </Modal>
    );
};
