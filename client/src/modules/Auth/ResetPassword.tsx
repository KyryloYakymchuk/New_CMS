import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";
import { ResetPasswordForm } from "@components/Auth/ResetPasswordForm/ResetPasswordForm";

import { MainText } from "@utils/constants/AuthField/ResetPasswordFields/ResetPasswordFields";
import { ErrorAction } from "@redux/actions/error";

interface IFormValues {
  password: string;
  confirmPassword: string;
}

export const ResetPassword: FC = () => {
  const { title, description } = MainText;

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (value: IFormValues) => {};

  const handleAccept = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(ErrorAction());
  }, []);

  return (
    <>
      <AuthLayout title={title} description={description}>
        <ResetPasswordForm onSubmit={onSubmit} />
      </AuthLayout>
      <ModalConfirm
        openModal={openModal}
        message="A confirmation letter has been sent to the Email !"
        handleAccept={handleAccept}
      />
    </>
  );
};
