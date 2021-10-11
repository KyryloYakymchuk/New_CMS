import { ConfirmModalButton } from "@components/ConfirmModalButton/ConfirmModalButton";
import { SubmitModalButton } from "@components/SubmitModalButton/SubmitModalButton";

export const ModalButton = (handleAccept, handleClose, modalType) => {
  return (() => {
    switch (modalType) {
      case "confirm":
        return (
          <ConfirmModalButton
            handleAccept={handleAccept}
            handleClose={handleClose}
          />
        );
      case "submit":
        return <SubmitModalButton handleClose={handleClose} />;

      default:
        return <></>;
    }
  })();
};
