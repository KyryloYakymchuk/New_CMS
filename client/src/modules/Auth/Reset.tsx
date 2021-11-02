import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { resetAction } from '@redux/actions/auth';
import { MainText } from '@utils/constants/AuthField/ResetFields';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ResetForm } from '@components/Auth/ResetForm/ResetForm';
import { setModalStatusAction } from '@redux/actions/modal';

export interface IFormValues {
    email: string;
}

export const Reset: FC = () => {
    const { title, description } = MainText;

    const isModalOpen = useAppSelector(({ modalStatus }) => modalStatus?.modal);

    const dispatch = useDispatch();
    const { t } = useTranslation();

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
            <ModalConfirm
                isModalOpen={isModalOpen}
                message={t('A confirmation letter has been sent to the Email !')}
                handleAccept={handleAccept}
            />
        </>
    );
};
