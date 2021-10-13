import { FC } from "react";

import {
  AuthContainer,
  AuthTitle,
  Description,
} from "./styled/styled";

interface AuthProps {
  title: string;
  description: string;
}

export const AuthLayout: FC<AuthProps> = ({
  children,
  title,
  description,
}) => {

  return (
    <AuthContainer>
      <AuthTitle>{title}</AuthTitle>
      <Description>{description}</Description>
      {children}
    </AuthContainer>
  );
};
