import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { loginAction } from '@redux/actions/auth';
import { errorAction } from '@redux/actions/error';
import { MainText } from '@utils/constants/AuthField/LoginFields';
import { AuthLayout } from '@components/Auth/AuthLayout/AuthLayout';
import { LoginForm } from '@components/Auth/LoginForm/LoginForm';

export interface IFormValues {
    email: string;
    password: string;
}

export const Login: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const onSubmit = (value: IFormValues) => {
        dispatch(loginAction({ value, history }));
    };

    useEffect(() => {
        dispatch(errorAction());
    }, [dispatch]);

    const { title, description } = MainText;
    return (
        <AuthLayout title={t(title)} description={t(description)}>
            <LoginForm onSubmit={onSubmit} />
        </AuthLayout>
    );
};
