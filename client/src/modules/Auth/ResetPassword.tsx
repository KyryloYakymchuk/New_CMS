import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { resetPasswordAction } from '@redux/actions/auth';
import { setModalStatusAction } from '@redux/actions/modal';
import { MainText } from '@utils/constants/AuthField/ResetPasswordFields';
import { AuthRoutes } from '@utils/enums/routes';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ResetPasswordForm } from '@components/Auth/ResetPasswordForm/ResetPasswordForm';
import { useHistory } from 'react-router';

export interface IFormValues {
    newPassword: string;
    newPasswordConfirm: string;
}

export const ResetPassword: FC = () => {
    const { title, description } = MainText;

    const token = window.location.pathname.slice(
        window.location.pathname.lastIndexOf('/') + 1
    );

    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const isModalOpen = useTypedSelector(({ modalStatus }) => modalStatus?.modal);

    const onSubmit = (value: IFormValues) => {
        const val = {
            ...value,
            token
        };
        dispatch(resetPasswordAction({ val }));
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
                <ResetPasswordForm onSubmit={onSubmit}/>
            </AuthLayout>
            <ModalConfirm
                isModalOpen={isModalOpen}
                message={t('Password reset successfully !')}
                handleAccept={handleAccept}
            />
        </>
    );
};
