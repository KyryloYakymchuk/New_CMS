import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { errorAction } from "@redux/actions/error";
import { loaderAction } from "@redux/actions/loader";
import { resetPasswordAction } from "@redux/actions/auth";

import { MainText } from "@utils/constants/AuthField/ResetPasswordFields";
import { AuthRoutes } from "@utils/enums/routes";

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

    dispatch(resetPasswordAction({ val, setOpenModal }));
    dispatch(loaderAction(true));
  };

  const handleAccept = () => {
    setOpenModal(false);
    history.push(AuthRoutes.LOGIN);
  };

  useEffect(() => {
    dispatch(errorAction());
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
