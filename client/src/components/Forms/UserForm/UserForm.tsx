import { Buttons } from '@components/Button/Button';
import FormField from '@components/FormField/FormField';
import { ImageUploader } from '@components/imageUploader/imageUploader';
import { MultiSelect } from '@components/MultiSelect/MultiSelect';
import {
    GetSelectDataType,
    IOption,
    MultiValueType,
    OnChangeMultiValueType
} from '@interfaces/types';
import { ButtonContainer } from '@modules/Modules/styled';
import { IUser } from '@redux/types/users';
import { UserFormFields } from '@utils/constants/UserFormFields';
import { FC } from 'react';
import { Form } from 'react-final-form';
import { FieldCustom, FormContainer, SelectFieldCustom } from './styled';
import { useTranslation } from 'react-i18next';
import { userEditFormValidator } from '@utils/validators/users/UserEditFormValidator';
import { userCreateFormValidator } from '@utils/validators/users/UserCreateFormValidator';

interface IProps {
    currentUser?: any;
    arrGroupNames?: IOption[];
    getSelectData?: GetSelectDataType;
    onChangeMultiValue: OnChangeMultiValueType;
    selectGroupArr?: MultiValueType;
    onSubmitForm: (value: IUser) => void;
}

export const UserForm: FC<IProps> = ({
    currentUser,
    getSelectData,
    arrGroupNames,
    selectGroupArr,
    onChangeMultiValue,
    onSubmitForm
}) => {
    const options: IOption[] | undefined = arrGroupNames;
    const { t } = useTranslation();

    const formInitialValues = {
        ...currentUser
    };

    return (
        <Form
            onSubmit={onSubmitForm}
            initialValues={formInitialValues}
            validate={currentUser ? userEditFormValidator : userCreateFormValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        {UserFormFields.map(({ icon, ...field }, index) => (
                            <FieldCustom
                                key={index}
                                {...field}
                                variant="outlined"
                                component={FormField}
                            >
                                {icon}
                            </FieldCustom>
                        ))}
                        <SelectFieldCustom
                            name="group"
                            selectName={t('Group')}
                            placeholderName={t('Groups')}
                            component={MultiSelect}
                            onChangeMultiValue={onChangeMultiValue}
                            selectGroupArr={selectGroupArr}
                            getSelectData={getSelectData}
                            options={options}
                        />
                        {currentUser ? <ImageUploader name="profileImg" /> : null}

                        <ButtonContainer>
                            <Buttons title={t('Apply')} type="submit" style="pinkButton" />
                            <Buttons
                                title={t('Cancel')}
                                type="button"
                                style="grayButton"
                                onClickFunction={() => history.back()}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
