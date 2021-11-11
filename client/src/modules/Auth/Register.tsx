import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { registerAction } from '@redux/actions/auth';
import { loaderAction } from '@redux/actions/loader';
import { setModalStatusAction } from '@redux/actions/modal';
import { errorAction } from '@redux/actions/error';
import { MainText } from '@utils/constants/AuthField/RegisterFields';
import { AuthRoutes } from '@utils/enums/RoutesPath';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { RegisterForm } from '@components/Auth/RegisterForm/RegisterForm';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';

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
    const { t } = useTranslation();

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
            <AuthLayout title={t(title)} description={t(description)}>
                <RegisterForm onSubmit={onSubmit} />
            </AuthLayout>
            <ModalConfirm
                handleAccept={handleAccept}
            >
            <ModalButton handleAccept={handleAccept} />
            </ModalConfirm>
        </>
    );
};
