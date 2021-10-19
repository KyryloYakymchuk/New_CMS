import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ErrorAction } from "@redux/actions/error";
import { LoaderAction } from "@redux/actions/loader";
import { ResetAction } from "@redux/actions/auth";

import { MainText } from "@utils/constants/AuthField/ResetFields/ResetFields";

import { AuthLayout } from "@components/Auth/AuthLayout/AuthLayout";
import { ModalConfirm } from "@components/Modal/Modal_Confirm_Submit/ModalConfirm";
import { ResetForm } from "@components/Auth/ResetForm/ResetForm";

export interface IFormValues {
  email: string;
}

export const Reset: FC = () => {
  const { title, description } = MainText;

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (value: IFormValues) => {
    dispatch(ResetAction({ email: value.email, setOpenModal }));
    dispatch(LoaderAction(true));
  };

  const handleAccept = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(ErrorAction());
  }, [dispatch]);

  return (
    <>
      <AuthLayout title={title} description={description}>
        <ResetForm onSubmit={onSubmit} />
      </AuthLayout>
      <ModalConfirm
        openModal={openModal}
        message="A confirmation letter has been sent to the Email !"
        handleAccept={handleAccept}
      />
    </>
  );
};
