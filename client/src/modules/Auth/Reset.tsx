import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { resetAction } from '@redux/actions/auth';
import { MainText } from '@utils/constants/AuthField/ResetFields';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ResetForm } from '@components/Auth/ResetForm/ResetForm';
import { setModalStatusAction } from '@redux/actions/modal';
import { ModalButton } from '@components/Modal/ModalButton';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';

export interface IFormValues {
    email: string;
}

export const Reset: FC = () => {
    const { title, description } = MainText;

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isModalOpen = useAppSelector(modalStatusSelector);
    const message = useAppSelector(modalMessageSelector);
    const onSubmit = (value: IFormValues) => {
        dispatch(resetAction({ email: value.email }));
        dispatch(loaderAction(true));
    };

    const handleAccept = () => {
        dispatch(setModalStatusAction(false));
    };

    useEffect(() => {
        dispatch(errorAction());
    }, [dispatch]);

    return (
        <>
            <AuthLayout title={t(title)} description={t(description)}>
                <ResetForm onSubmit={onSubmit} />
            </AuthLayout>
            <ModalConfirm message={message} modalStatus={isModalOpen} handleAccept={handleAccept}>
                <ModalButton handleAccept={handleAccept} />
            </ModalConfirm>
        </>
    );
};
