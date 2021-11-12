import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { confirmRegisterdAction, loginAction } from '@redux/actions/auth';
import { errorAction } from '@redux/actions/error';
import { MainText } from '@utils/constants/AuthField/LoginFields';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { LoginForm } from '@components/Auth/LoginForm/LoginForm';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { setModalStatusAction } from '@redux/actions/modal';

export interface IFormValues {
    email: string;
    password: string;
}

export const Login: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const token = useParams();
    console.log(token);

    const onSubmit = (value: IFormValues) => {
        dispatch(loginAction({ value, history }));
    };

    const handleAccept = () => {
        dispatch(setModalStatusAction(false));
    };
    
    useEffect(() => {
        if (token) {
            dispatch(confirmRegisterdAction(token));
        }
        dispatch(errorAction());
    }, [dispatch, token]);

    const { title, description } = MainText;
    return (
    <> 
       <AuthLayout title={t(title)} description={t(description)}>
            <LoginForm onSubmit={onSubmit} />
       </AuthLayout>
        <ModalConfirm
                handleAccept={handleAccept}
        >
            <ModalButton handleAccept={handleAccept} />
         </ModalConfirm>
    </>
    );
};
