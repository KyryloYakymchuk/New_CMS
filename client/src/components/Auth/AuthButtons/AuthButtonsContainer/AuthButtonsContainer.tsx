import { useStyles } from "@utils/styles/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { HelperText } from "./../styled/styled";

interface ButtonProps {
  button: any;
  secondButton: any;
  description: string;
  path: string;
}

export const AuthButtonContainer: FC<ButtonProps> = ({
  button,
  secondButton,
  description,
  path,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.Button}>{button}</div>
      <HelperText>
        {description}
        <Link to={path}>{secondButton}</Link>
      </HelperText>
    </>
  );
};
