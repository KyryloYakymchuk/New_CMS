import { Dispatch, FC } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { FormApi } from 'final-form';

import { errorMessageSelector } from '@redux/selectors/error';

import { useAppSelector } from '@utils/hooks/useAppSelector';
import { initialfileds } from '@utils/constants/Modules/typeSelectData';
import { toPreviousPage } from '@utils/functions/historyBack';

import { ErrorMessage } from '@modules/Auth/styled';
import { ButtonContainer, FormContainer, Label } from '@modules/Modules/styled';

import { Buttons } from '@components/Button/Button';
import { FieldSettings } from '@components/Forms/Modules/FieldSettings';
import FormField from '@components/FormField/FormField';

import { ICreateFieldProps, IFieldProps } from '@interfaces/types';

import { Select } from '@modules/Settings/styled/styled';
import { useStyles } from '@utils/styles/field';

interface IProps {
    currentField?: IFieldProps;
    onSubmit: (value: ICreateFieldProps) => void;
    setCurrentField: Dispatch<React.SetStateAction<IFieldProps>>;
}

export const CreateFieldForm: FC<IProps> = ({ currentField, onSubmit, setCurrentField }) => {
    const { t } = useTranslation();
    const errorMessage = useAppSelector(errorMessageSelector);
    const classes = useStyles();

    const handleChange =
        (form: FormApi<ICreateFieldProps, Partial<ICreateFieldProps>>) =>
        (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                        <Field
                            className={classes.root}
                            label={t('Title')}
                            name={t('title')}
                            type={currentField?.key}
                            component={FormField}
                        />
                        <FieldSettings settings={currentField?.settings} />
                        <ButtonContainer>
                            <Buttons type="submit" title={t('Apply')} style="pinkButton" />
                            <Buttons
                                type="button"
                                title={t('Cancel')}
                                style={'greyButton'}
                                onClickFunction={toPreviousPage}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
