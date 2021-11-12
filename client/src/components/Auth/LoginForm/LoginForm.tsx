import { FC } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { ButtonsData, LoginFields } from '@utils/constants/AuthField/LoginFields';
import { loginValidator } from '@utils/validators/Auth/LoginValidator';
import { IFormValues } from '@modules/Auth/Login';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';

import { useAppSelector } from '@utils/hooks/useAppSelector';
import {
    ButtonContainer,
    FieldCustom,
    FormContainer,
    ForgotPassword,
    ErrorMessage
} from '@modules/Auth/styled';
import { errorMessageSelector } from '@redux/selectors/error';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;

    const errorMessage = useAppSelector(errorMessageSelector);
    const { t } = useTranslation();

    return (
        <Form
            onSubmit={onSubmit}
            validate={loginValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                        {LoginFields.map(({ icon, ...field }, index) => (
                            <FieldCustom
                                key={index}
                                {...field}
                                variant="outlined"
                                component={FormField}
                            >
                                {icon}
                            </FieldCustom>
                        ))}
                        <ForgotPassword to="/auth/reset">{t('Forgot Password?')}</ForgotPassword>
                        <ButtonContainer>
                            <AuthButtonContainer
                                description={t(description)}
                                buttonIcon={buttonIcon}
                                buttonText={t(buttonText)}
                                linkText={t(linkText)}
                                path={path}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
