import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { resetPasswordAction } from '@redux/actions/auth';
import { setModalStatusAction } from '@redux/actions/modal';
import { MainText } from '@utils/constants/AuthField/ResetPasswordFields';
import { AuthRoutes } from '@utils/enums/RoutesPath';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ResetPasswordForm } from '@components/Auth/ResetPasswordForm/ResetPasswordForm';
import { useHistory } from 'react-router';
import { ModalButton } from '@components/Modal/ModalButton';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';
import { IResetFormValues } from '@redux/types/auth';

export const ResetPassword: FC = () => {
    const { title, description } = MainText;

    const token = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);

    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const isModalOpen = useAppSelector(modalStatusSelector);
    const message = useAppSelector(modalMessageSelector);
    const onSubmit = (value: IResetFormValues) => {
        const val = {
            value,
            token
        };
        dispatch(resetPasswordAction(val));
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
                <ResetPasswordForm onSubmit={onSubmit} />
            </AuthLayout>
            <ModalConfirm message={message} modalStatus={isModalOpen} handleAccept={handleAccept}>
                <ModalButton handleAccept={handleAccept} />
            </ModalConfirm>
        </>
    );
};
