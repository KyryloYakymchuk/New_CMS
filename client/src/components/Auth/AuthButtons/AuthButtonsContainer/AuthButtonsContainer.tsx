import { FC } from "react";

interface ButtonProps {
  button: any;
}

export const AuthButtonContainer: FC<ButtonProps> = ({ button }) => {
  return <>{button}</>;
};
