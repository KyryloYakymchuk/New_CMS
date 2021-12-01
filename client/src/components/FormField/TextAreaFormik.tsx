import { FC } from 'react';
import { FieldProps } from 'formik';
import { Textarea } from './styled';

interface ITextAreaFormik extends FieldProps{
    placeholder: string;
}
export const TextAreaFormik: FC<ITextAreaFormik> = ({ placeholder, field }) => {
    
    return (
        <Textarea
            {...field}
        >
            {placeholder}
        </Textarea>
    );
};
