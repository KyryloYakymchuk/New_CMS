import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { LoginAction } from "@redux/actions/auth";

import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { LoginForm } from "@components/Auth/LoginForm/LoginForm";
import { MainText } from "@utils/constants/AuthField/LoginFields/LoginFields";
import { ErrorAction } from "@redux/actions/error";

interface IFormValues {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (value: IFormValues) => {
    dispatch(LoginAction({ value, history }));
  };

  useEffect(() => {
    dispatch(ErrorAction());
  }, []);

  const { title, description } = MainText;
  return (
    <AuthLayout title={title} description={description}>
      <LoginForm onSubmit={onSubmit} />
    </AuthLayout>
  );
};
