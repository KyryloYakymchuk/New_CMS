import { FC } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Buttons } from '@components/Button/Button';

import FormikTextField from '@components/FormField/FormikTextField';
import { ICommentsForm } from '@interfaces/types';

import { initialValues, validationSchema } from '@utils/constants/Tickets/CreateTicketField';
import { ButtonContainer, FormContainer } from './styled';
import { createTicketField } from '@utils/constants/Tickets/CreateTicketField';
import { toPreviousPage } from '@utils/functions/historyBack';

interface IProps {
    onSubmit: (value: ICommentsForm) => void;
}

export const CreateTicketForm: FC<IProps> = ({ onSubmit }) => {
    const newCommentFormForm = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit
    });

    return (
        <FormikProvider value={newCommentFormForm}>
            <Form onSubmit={newCommentFormForm.handleSubmit}>
                <FormContainer>
                    {createTicketField.map(({ value, label, img }) => (
                        <FormikTextField name={value} label={label}>
                            {img}
                        </FormikTextField>
                    ))}

                    <ButtonContainer>
                        <Buttons type="submit" title="submit" style="pinkButton" />
                        <Buttons
                            type="button"
                            title="cancel"
                            style="grayButton"
                            onClickFunction={toPreviousPage}
                        />
                    </ButtonContainer>
                </FormContainer>
            </Form>
        </FormikProvider>
    );
};
