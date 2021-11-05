import { Buttons } from '@components/Button/Button';
import ControlledFormField from '@components/FormField/ControlledFormField';
import { ISingleFilterFormValue, OnChangeFieldValueType } from '@interfaces/types';
import { Icons } from '@utils/constants/icon';
import { FC } from 'react';
import { Form } from 'react-final-form';
import { ButtonBlock, FieldCustom } from './styled';

interface IProps {
    filterFormValue: string;
    onSubmitSingleFilterForm: (value: ISingleFilterFormValue) => void;
    clearSingleFilterFormValue: VoidFunction;
    onChangeFieldValue: OnChangeFieldValueType;
}

export const SingleFilterForm: FC<IProps> = ({
    onSubmitSingleFilterForm,
    filterFormValue,
    clearSingleFilterFormValue,
    onChangeFieldValue
}) => {
    return (
        <Form
            onSubmit={onSubmitSingleFilterForm}
            initialValues={{ search: filterFormValue }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FieldCustom
                        filterFormValue={filterFormValue}
                        type="text"
                        name="search"
                        label="Search"
                        variant="outlined"
                        component={ControlledFormField}
                        onChangeFieldValue={onChangeFieldValue}
                    >
                        {Icons.SearchIcon}
                    </FieldCustom>

                    <ButtonBlock>
                        <Buttons title="Search" type="submit" style="pinkButton" />
                        <Buttons
                            title="Clear"
                            type="button"
                            style="grayButton"
                            onClickFunction={clearSingleFilterFormValue}
                        />
                    </ButtonBlock>
                </form>
            )}
        />
    );
};
