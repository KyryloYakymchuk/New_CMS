import { FC } from 'react';
import { Form } from 'react-final-form';
import {
    ButtonsData,
    LoginFields
} from '@utils/constants/AuthField/LoginFields';
import { LoginValidator } from '@utils/validators/Auth/LoginValidator';
import { IFormValues } from '@modules/Auth/Login';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';
import {
    ButtonContainer,
    FieldCustom,
    FormContainer,
    ForgotPassword,
    ErrorMessage
} from '@modules/Auth/styled/styled';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;

    const errorMessage = useTypedSelector(({ error }) => error.message);

    return (
        <Form
            onSubmit={onSubmit}
            validate={LoginValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
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
                        <ForgotPassword to="/auth/reset">Forgot Password</ForgotPassword>
                        <ButtonContainer>
                            <AuthButtonContainer
                                description={description}
                                buttonIcon={buttonIcon}
                                buttonText={buttonText}
                                linkText={linkText}
                                path={path}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
