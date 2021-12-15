import { FC } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Buttons } from '@components/Button/Button';

import FormikTextField from '@components/FormField/FormikTextField';
import { ICommentsForm } from '@interfaces/types';
import { TextAreaFormik } from '@components/FormField/TextAreaFormik';
import { initialValues, validationSchema } from '@utils/constants/Tickets/TicketInfoField';
import { ButtonContainer, FormContainer } from './styled';
//import { TextAreaFormik } from '@components/FormField/TextAreaFormik';

interface IProps {
    onSubmit: (value: ICommentsForm) => void;
    setAnswerFormStatus: (value: boolean) => void;
}

export const CommentForm: FC<IProps> = ({ onSubmit, setAnswerFormStatus }) => {
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
                    <FormikTextField name="subject" label="Subject"></FormikTextField>
                    <TextAreaFormik name="text"></TextAreaFormik>
                    <ButtonContainer>
                        <Buttons type="submit" title="submit" style="pinkButton" />
                        <Buttons
                            type="submit"
                            title="close"
                            style="grayButton"
                            onClickFunction={() => setAnswerFormStatus(false)}
                        />
                    </ButtonContainer>
                </FormContainer>
            </Form>
        </FormikProvider>
    );
};
