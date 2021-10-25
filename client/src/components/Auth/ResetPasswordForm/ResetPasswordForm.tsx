import { FC } from 'react';
import { Form } from 'react-final-form';
import {
    ButtonsData,
    ResetPasswordFields
} from '@utils/constants/AuthField/ResetPasswordFields';
import { Loader } from '@utils/constants/Loader';
import { ResetPasswordValidator } from '@utils/validators/Auth/ResetPasswordValidator';
import { IFormValues } from '@modules/Auth/ResetPassword';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';
import {
    ButtonContainer,
    ErrorMessage,
    FieldCustom,
    FormContainer
} from '@modules/Auth/styled';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const ResetPasswordForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;
    const { LoaderCircularButton } = Loader;
    const errorMessage = useTypedSelector(({ error }) => error.message);
    const loaderStatus = useTypedSelector(({ loader }) => loader.loaderStatus);
    return (
        <Form
            onSubmit={onSubmit}
            validate={ResetPasswordValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                        {ResetPasswordFields.map(({  icon, ...field }, index) => (
                            <FieldCustom
                                key={index}
                                {...field}
                                variant="outlined"
                                component={FormField}
                            >
                                {icon}
                            </FieldCustom>
                        ))}
                        <ButtonContainer>
                            <AuthButtonContainer
                                description={description}
                                buttonIcon={buttonIcon}
                                buttonText={buttonText}
                                Loader={LoaderCircularButton}
                                linkText={linkText}
                                path={path}
                                loaderStatus={loaderStatus}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
