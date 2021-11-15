
import { FC } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { errorMessageSelector } from '@redux/selectors/error';

import { useAppSelector } from '@utils/hooks/useAppSelector';

import { ErrorMessage, FieldCustom } from '@modules/Auth/styled';
import { ButtonContainer, FormContainer } from '@modules/Modules/styled';

import { Buttons } from '@components/Button/Button';
import { FieldSettings } from '@components/Forms/Modules/FieldSettings';
import FormField from '@components/FormField/FormField';

import { ICreateFieldProps, IFieldProps } from '@interfaces/types';



interface IProps {
    currentField?:IFieldProps;
    onSubmit:(value:ICreateFieldProps) => void;
}

export const CreateFieldForm: FC<IProps> = ({ currentField, onSubmit }) =>{
const { t } = useTranslation(); 
const errorMessage = useAppSelector(errorMessageSelector);  
return (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>    
                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                            <FieldCustom
                                label={t('Name')}
                                name={'textPrompt'}
                                type={currentField?.key}
                                component={FormField}
                            />
                        {currentField?.settings &&
                          <FieldSettings settings={currentField?.settings}/>
                        }
                        <ButtonContainer>
                            <Buttons type="submit" title={t('Apply')} style="pinkButton" />
                            <Buttons
                                type="button"
                                title={t('Cancel')}
                                style={'greyButton'}
                                onClickFunction={() => history.back()}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
);
};