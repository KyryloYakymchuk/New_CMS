import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { registerAction } from '@redux/actions/auth';
import { loaderAction } from '@redux/actions/loader';
import { setModalStatusAction } from '@redux/actions/modal';
import { errorAction } from '@redux/actions/error';

import { MainText } from '@utils/constants/AuthField/RegisterFields';
import { AuthRoutes } from '@utils/enums/routes';

import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { RegisterForm } from '@components/Auth/RegisterForm/RegisterForm';
import { ModalConfirm } from '@components/Modal/Modal_Confirm_Submit/ModalConfirm';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

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
    const { title, description } = MainText;

    const dispatch = useDispatch();
    const history = useHistory();
    const isModalOpen = useTypedSelector(({ modalStatus }) => modalStatus?.modal);

    const onSubmit = (value: IFormValues) => {
        dispatch(registerAction({ value }));
        dispatch(loaderAction(true));
    };

    const handleAccept = () => {
        dispatch(setModalStatusAction(false));

        history.push(AuthRoutes.LOGIN); 
    };
 
    useEffect(() => {
        dispatch(errorAction());
    }, [dispatch]);

    return (
        <>
            <AuthLayout title={title} description={description}>
                <RegisterForm onSubmit={onSubmit} />
            </AuthLayout>
            <ModalConfirm
                isModalOpen={isModalOpen}
                message="A confirmation letter has been sent to the Email !"
                handleAccept={handleAccept}
            />
        </>
    );
};
