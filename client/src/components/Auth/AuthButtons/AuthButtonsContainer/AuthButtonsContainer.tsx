import { useStyles } from "@utils/styles/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { HelperText } from "./../styled/styled";

interface ButtonProps {
  button: any;
  Loader?: any;
  secondButton: any;
  description: string;
  path: string;
  loaderStatus?: boolean;
}

export const AuthButtonContainer: FC<ButtonProps> = ({
  button,
  Loader,
  secondButton,
  description,
  path,
  loaderStatus,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.Button}>{loaderStatus ? Loader : button}</div>
      <HelperText>
        {description}
        <Link to={path}>{secondButton}</Link>
      </HelperText>
    </>
  );
};
