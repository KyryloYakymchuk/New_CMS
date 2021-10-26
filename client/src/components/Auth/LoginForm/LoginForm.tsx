import { FC } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import {
    ButtonsData,
    LoginFields
} from '@utils/constants/AuthField/LoginFields';
import { LoginValidator } from '@utils/validators/Auth/LoginValidator';
import { IFormValues } from '@modules/Auth/Login';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';

import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import {   ButtonContainer,
    FieldCustom,
    FormContainer,
    ForgotPassword,
    ErrorMessage } from '@modules/Auth/styled';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;

    const errorMessage = useTypedSelector(({ error }) => error.message);
    const { t } = useTranslation();

    return (
        <Form
            onSubmit={onSubmit}
            validate={LoginValidator}
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
                        <ForgotPassword to="/auth/reset">{t('Forgot Password')}</ForgotPassword>
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
