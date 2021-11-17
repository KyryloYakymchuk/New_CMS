import { Buttons } from '@components/Button/Button';
import ControlledFormField from '@components/FormField/ControlledFormField';
import { ISingleFilterFormValue, OnChangeFieldValueType } from '@interfaces/types';
import { Icons } from '@utils/constants/icon';
import { useStyles } from '@utils/styles/field';
import { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { ButtonBlock, FilterBlock } from './styled';

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
    const classes = useStyles();
    return (
        <FilterBlock>
            <Form
                onSubmit={onSubmitSingleFilterForm}
                initialValues={{ search: filterFormValue }}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            className={classes.root}
                            filterFormValue={filterFormValue}
                            type="text"
                            name="search"
                            label="Search"
                            variant="outlined"
                            component={ControlledFormField}
                            onChangeFieldValue={onChangeFieldValue}
                        >
                            <Icons.SearchIcon />
                        </Field>

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
        </FilterBlock>
    );
};
