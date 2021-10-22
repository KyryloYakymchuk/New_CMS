import { FC } from 'react';
import { Form } from 'react-final-form';


import {
    ButtonsData,
    ResetFields
} from '@utils/constants/AuthField/ResetFields';
import { Loader } from '@utils/constants/Loader';
import { ResetValidator } from '@utils/validators/Auth/ResetValidator';

import { IFormValues } from '@modules/Auth/Reset';

import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer';

import {
    ButtonContainer,
    ErrorMessage,
    FieldCustom,
    FormContainer
} from '@modules/Auth/styled/styled';
import { useTypedSelector } from '@utils/hooks/useTypedSelector';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const ResetForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;
    const { LoaderCircularrButton } = Loader;

    const errorMessage = useTypedSelector(({ error }) => error.message);
    const loaderStatus = useTypedSelector(({ loader }) => loader.loaderStatus);

    return (
        <Form
            onSubmit={onSubmit}
            validate={ResetValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                        {ResetFields.map(({ type, name, label, icon }, index) => (
                            <FieldCustom
                                key={index}
                                type={type}
                                name={name}
                                label={label}
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
                                Loader={LoaderCircularrButton}
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
