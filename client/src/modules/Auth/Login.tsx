import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { LoginForm } from "@components/Auth/LoginForm/LoginForm";
import { FC } from "react";

interface IFormValues {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const onSubmit = (value: IFormValues) => {
    console.log(value);
  };

  return (
    <AuthLayout title="Log in">
      <LoginForm onSubmit={onSubmit} />
    </AuthLayout>
  );
};
