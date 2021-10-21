import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { errorAction } from '@redux/actions/error';
import { loaderAction } from '@redux/actions/loader';
import { resetAction } from '@redux/actions/auth';
import { modalStatusSelector } from '@redux/selectors/modal';

import { MainText } from '@utils/constants/AuthField/ResetFields';

import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { ModalConfirm } from '@components/Modal/Modal_Confirm_Submit/ModalConfirm';
import { ResetForm } from '@components/Auth/ResetForm/ResetForm';
import { setModalStatusAction } from '@redux/actions/modal';

export interface IFormValues {
    email: string;
}

export const Reset: FC = () => {
    const { title, description } = MainText;

    const isModalOpen = useSelector(modalStatusSelector);
    const dispatch = useDispatch();
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
            <AuthLayout title={title} description={description}>
                <ResetForm onSubmit={onSubmit} />
            </AuthLayout>
            <ModalConfirm
                isModalOpen={isModalOpen}
                message="A confirmation letter has been sent to the Email !"
                handleAccept={handleAccept}
            />
        </>
    );
};
