import { FC } from 'react';
import { useField } from 'formik';
import { ErrorBlock, Textarea } from './styled';

interface ITextAreaFormik {
    name: string;
}
export const TextAreaFormik: FC<ITextAreaFormik> = ({ name }) => {
    const [field, meta] = useField(name);
    const { touched, error } = meta;
    return (
        <div>
            <Textarea {...field} value={field.value} onChange={field.onChange(field.name)} />
            {touched && error ? <ErrorBlock className="error">{error}</ErrorBlock> : null}
        </div>
    );
};
