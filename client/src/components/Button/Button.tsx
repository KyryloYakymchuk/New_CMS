import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Button } from "@mui/material";
import { useStyles } from "@utils/styles/button";

import { FC } from "react";
import { ButtonContainer } from "./styled/styled";

interface IProps {
  title: string;
  type: string;
  icon?: React.ReactNode;
}

export const Buttons: FC<IProps> = ({ title, type, icon }) => {
  const styles = useStyles();

  return (
    <ButtonContainer className={(styles as any)[type]}>
      <Button
        //startIcon={ icon}
        size="large"
        color="inherit"
        variant="contained"
        type="submit"
 
      >
        
        {title}
      </Button>
    </ButtonContainer>
  );
};
