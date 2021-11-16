import { FC } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ButtonsData, ResetFields } from '@utils/constants/AuthField/ResetFields';
import { Loader } from '@utils/constants/Loader';
import { ResetValidator } from '@utils/validators/Auth/ResetValidator';
import { IFormValues } from '@modules/Auth/Reset';
import FormField from '@components/FormField/FormField';
import { AuthButtonContainer } from '@components/Auth/AuthButtons/AuthButtonsContainer';
import { ButtonContainer, ErrorMessage, FieldCustom, FormContainer } from '@modules/Auth/styled';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { errorMessageSelector } from '@redux/selectors/error';
import { loaderStatusSelector } from '@redux/selectors/loader';

interface LoginProps {
    onSubmit: (value: IFormValues) => void;
}

export const ResetForm: FC<LoginProps> = ({ onSubmit }) => {
    const { buttonIcon, buttonText, linkText, description, path } = ButtonsData;
    const { LoaderCircularButton } = Loader;
    const errorMessage = useAppSelector(errorMessageSelector);
    const loaderStatus = useAppSelector(loaderStatusSelector);
    console.log('initial');
    
    const { t } = useTranslation();
    return (
        <Form
            onSubmit={onSubmit}
            validate={ResetValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                        {ResetFields.map(({ icon, ...field }, index) => (
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
