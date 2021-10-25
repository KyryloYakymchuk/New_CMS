import { FC } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalButton } from '@components/ModalButton';
import { useStyles } from '@utils/styles/modal';
import { Text } from './styled';

interface ModalProps {
    isModalOpen: boolean;
    message: string;
    handleAccept: VoidFunction;
    handleClose?: VoidFunction;
}

export const ModalConfirm: FC<ModalProps> = ({
    isModalOpen,
    message,
    handleAccept,
    handleClose
}) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isModalOpen}
            onClose={handleClose || handleAccept}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isModalOpen}>
                <div className={classes.paper}>
                    <Text>{message}</Text>
                    <ModalButton handleAccept={handleAccept} handleClose={handleClose}/>
                </div>
            </Fade>
        </Modal>
    );
};
