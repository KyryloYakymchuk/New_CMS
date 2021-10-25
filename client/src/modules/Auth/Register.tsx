import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { registerAction } from '@redux/actions/auth';
import { loaderAction } from '@redux/actions/loader';
import { setModalStatusAction } from '@redux/actions/modal';
import { errorAction } from '@redux/actions/error';
import { MainText } from '@utils/constants/AuthField/RegisterFields';
import { AuthRoutes } from '@utils/enums/routes';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { RegisterForm } from '@components/Auth/RegisterForm/RegisterForm';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
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
    const { t } = useTranslation();

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
            <AuthLayout title={t(title)} description={t(description)}>
                <RegisterForm onSubmit={onSubmit}/>
            </AuthLayout>
            <ModalConfirm
                isModalOpen={isModalOpen}
                message={t('A confirmation letter has been sent to the Email !')}
                handleAccept={handleAccept}
            />
        </>
    );
};
