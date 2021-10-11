import { FC } from "react";
import { AuthContainer, AuthTitle } from "./styled/styled";

interface AuthProps {
  title: string;
}

export const AuthLayout: FC<AuthProps> = ({ children, title }) => {
  return (
    <AuthContainer>
      <AuthTitle>{title}</AuthTitle>
      {children}
    </AuthContainer>
  );
};
