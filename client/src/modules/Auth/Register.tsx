import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { RegisterAction } from "@redux/actions/auth";
import { ErrorAction } from "@redux/actions/error";

import { MainText } from "@utils/constants/AuthField/RegisterFields/RegisterFields";

import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { RegisterForm } from "@components/Auth/RegisterForm/RegisterForm";
import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";

export interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  phone: string;
  birthday: string;
}

export const Register: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const { title, description } = MainText;

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (value: IFormValues) => {
    dispatch(RegisterAction({ value, setOpenModal }));
  };

  const handleAccept = () => {
    setOpenModal(false);
    history.push("/auth/login");
  };

  useEffect(() => {
    dispatch(ErrorAction());
  }, []);

  return (
    <>
      <AuthLayout title={title} description={description}>
        <RegisterForm onSubmit={onSubmit} />
      </AuthLayout>
      <ModalConfirm
        openModal={openModal}
        message="A confirmation letter has been sent to the Email !"
        handleAccept={handleAccept}
      />
    </>
  );
};
