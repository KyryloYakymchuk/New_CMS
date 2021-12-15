import { FC } from 'react';
import { useField } from 'formik';
import { ErrorBlock, Textarea } from './styled';

interface ITextAreaFormik {
    name: string;
}
export const TextAreaFormik: FC<ITextAreaFormik> = ({ name }) => {
    const [field, meta] = useField(name);

    return (
        <div>
            <Textarea
                {...field}
                value={field.value}
                onChange={field.onChange(field.name)}
            ></Textarea>
            {meta.touched && meta.error ? (
                <ErrorBlock className="error">{meta.error}</ErrorBlock>
            ) : null}
        </div>
    );
};
