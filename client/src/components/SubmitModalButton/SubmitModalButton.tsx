
import { Button } from "@material-ui/core";

import { FC } from "react";

interface ButtonProps {
  handleClose: any;
}

export const SubmitModalButton: FC<ButtonProps> = ({ handleClose }) => {
  return (
    <Button variant="contained" onClick={handleClose}>
      Ok
    </Button>
  );
};
