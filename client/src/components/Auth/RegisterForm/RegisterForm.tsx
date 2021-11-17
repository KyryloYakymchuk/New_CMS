import { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { ButtonsData, RegisterFields } from '@utils/constants/AuthField/RegisterFields';
import { registerValidator } from '@utils/validators/Auth/RegisterValidator';
import { Loader } from '@utils/constants/Loader';
import { IFormValues } from '@modules/Auth/Register';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';
import { ButtonContainer, ErrorMessage, FormContainer } from '@modules/Auth/styled';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { errorMessageSelector } from '@redux/selectors/error';
import { loaderStatusSelector } from '@redux/selectors/loader';
import { useStyles } from '@utils/styles/field';

interface RegisterProps {
    onSubmit: (value: IFormValues) => void;
}

export const RegisterForm: FC<RegisterProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;
    const { LoaderCircularButton } = Loader;

    const errorMessage = useAppSelector(errorMessageSelector);
    const loaderStatus = useAppSelector(loaderStatusSelector);

    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <Form
            onSubmit={onSubmit}
            validate={registerValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                        {RegisterFields.map(({ icon, ...field }, index) => (
                            <Field
                                className={classes.root}
                                key={index}
                                {...field}
                                variant="outlined"
                                component={FormField}
                            >
                                {icon}
                            </Field>
                        ))}
                        <ButtonContainer>
                            <AuthButtonContainer
                                description={t(description)}
                                buttonIcon={buttonIcon}
                                buttonText={t(buttonText)}
                                Loader={LoaderCircularButton}
                                linkText={t(linkText)}
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
