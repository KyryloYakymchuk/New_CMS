import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { RegisterForm } from "@components/Auth/RegisterForm/RegisterForm";

import { FC } from "react";

interface IFormValues {
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const Register: FC = () => {
  const onSubmit = (value: IFormValues) => {
    console.log(value);
  };

  return (
    <AuthLayout title="Register">
      <RegisterForm onSubmit={onSubmit} />
    </AuthLayout>
  );
};
