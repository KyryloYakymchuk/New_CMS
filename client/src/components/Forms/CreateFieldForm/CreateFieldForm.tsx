import { Dispatch, FC } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { errorMessageSelector } from '@redux/selectors/error';

import { useAppSelector } from '@utils/hooks/useAppSelector';

import { ErrorMessage, FieldCustom } from '@modules/Auth/styled';
import { ButtonContainer, FormContainer, Label } from '@modules/Modules/styled';

import { Buttons } from '@components/Button/Button';
import { FieldSettings } from '@components/Forms/Modules/FieldSettings';
import FormField from '@components/FormField/FormField';

import { ICreateFieldProps, IFieldProps } from '@interfaces/types';

import { Select } from '@modules/Settings/styled/styled';
import { initialfileds } from '@utils/constants/Modules/typeSelectData';

interface IProps {
    currentField?: IFieldProps;
    onSubmit: (value: ICreateFieldProps) => void;
    setCurrentField: Dispatch<React.SetStateAction<IFieldProps>>;
}

export const CreateFieldForm: FC<IProps> = ({ currentField, onSubmit, setCurrentField }) => {
    const { t } = useTranslation();
    const errorMessage = useAppSelector(errorMessageSelector);

    const handleChange = (form: any) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        initialfileds.forEach((field) => {
            if (field.type === e.target.value) {
                setCurrentField(field);
            }
        });
        form.reset();
    };

    return (
        <Form
            onSubmit={onSubmit}
            validate={currentField?.validate}
            render={({ handleSubmit, form }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <Label>{t('Type')}</Label>
                        <div>
                            <Select onChange={handleChange(form)}>
                                {initialfileds.map(({ type }, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                        <FieldCustom
                            label={t('Title')}
                            name={t('title')}
                            type={currentField?.key}
                            component={FormField}
                        />
                        {currentField?.settings && (
                            <FieldSettings settings={currentField?.settings} />
                        )}
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
