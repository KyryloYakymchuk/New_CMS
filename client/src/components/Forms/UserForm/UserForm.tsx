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
import { IUser } from '@redux/types/users';
import { UserFormFields } from '@utils/constants/UserFormFields';
import { parceOption } from '@utils/functions/userFormData/parseOption';
import { FC } from 'react';
import { Form } from 'react-final-form';
import { ButtonContainer, FieldCustom, FormContainer, SelectFieldCustom } from './styled';

interface IProps {
    currentUser?: any;
    arrGroupNames?: string[];
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
    const options: IOption[] = parceOption(arrGroupNames);

    const formInitialValues = {
        ...currentUser,
        group: parceOption(currentUser?.group)
    };

    return (
        <Form
            onSubmit={onSubmitForm}
            initialValues={formInitialValues}
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
                            selectName="Group"
                            component={MultiSelect}
                            onChangeMultiValue={onChangeMultiValue}
                            selectGroupArr={selectGroupArr}
                            getSelectData={getSelectData}
                            options={options}
                        />
                        {currentUser ? <ImageUploader name="profileImg" /> : null}

                        <ButtonContainer>
                            <Buttons title="Apply" type="submit" style="pinkButton" />
                            <Buttons title="Acept" type="submit" style="grayButton" />
                            <Buttons
                                title="Cancel"
                                type="button"
                                style="grayButton"
                                onClickFunction={() => {
                                    history.back();
                                }}
                            />
                        </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
