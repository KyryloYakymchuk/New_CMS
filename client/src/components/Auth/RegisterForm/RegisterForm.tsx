import { FC } from 'react';
import { Form } from 'react-final-form';
import {
    ButtonsData,
    RegisterFields
} from '@utils/constants/AuthField/RegisterFields';
import { RegisterValidator } from '@utils/validators/Auth/RegisterValidator';
import { Loader } from '@utils/constants/Loader';
import { IFormValues } from '@modules/Auth/Register';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';
import {
    ButtonContainer,
    ErrorMessage,
    FieldCustom,
    FormContainer
} from '@modules/Auth/styled/styled';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

interface RegisterProps {
    onSubmit: (value: IFormValues) => void;
}

export const RegisterForm: FC<RegisterProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;
    const { LoaderCircularButton } = Loader;

    const errorMessage = useTypedSelector(({ error }) => error.message);
    const loaderStatus = useTypedSelector(({ loader }) => loader.loaderStatus);

    return (
        <Form
            onSubmit={onSubmit}
            validate={RegisterValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                        {RegisterFields.map(({ icon, ...field }, index) => (
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
