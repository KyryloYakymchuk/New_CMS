import { FC } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { ModalButton } from "@utils/functions/ModalButton/ModalButton";

import { useStyles } from "@utils/styles/modal";
import { Text } from "./styled/styled";

interface ModalProps {
  openModal: any;
  message: string;
  handleAccept: any;
  handleClose?: any;
}

export const ModalConfirm: FC<ModalProps> = ({
  openModal,
  message,
  handleAccept,
  handleClose,
}) => {
  const classes = useStyles();

  const buttons = ModalButton(handleAccept, handleClose);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose || handleAccept}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <Text>{message}</Text>
          {buttons}
        </div>
      </Fade>
    </Modal>
  );
};
