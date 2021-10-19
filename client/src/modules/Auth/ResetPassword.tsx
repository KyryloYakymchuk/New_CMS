import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { ErrorAction } from "@redux/actions/error";
import { LoaderAction } from "@redux/actions/loader";
import { ResetPasswordAction } from "@redux/actions/auth";

import { MainText } from "@utils/constants/AuthField/ResetPasswordFields/ResetPasswordFields";

import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";
import { ResetPasswordForm } from "@components/Auth/ResetPasswordForm/ResetPasswordForm";

export interface IFormValues {
  newPassword: string;
  newPasswordConfirm: string;
}

export const ResetPassword: FC = () => {
  const { title, description } = MainText;

  const token = window.location.pathname.slice(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (value: IFormValues) => {
    const val = {
      ...value,
      token,
    };

    dispatch(ResetPasswordAction({ val, setOpenModal }));
    dispatch(LoaderAction(true));
  };

  const handleAccept = () => {
    setOpenModal(false);
    history.push("/auth/login");
  };

  useEffect(() => {
    dispatch(ErrorAction());
  }, [dispatch]);

  return (
    <>
      <AuthLayout title={title} description={description}>
        <ResetPasswordForm onSubmit={onSubmit} />
      </AuthLayout>
      <ModalConfirm
        openModal={openModal}
        message="Password reset successfuly !"
        handleAccept={handleAccept}
      />
    </>
  );
};
