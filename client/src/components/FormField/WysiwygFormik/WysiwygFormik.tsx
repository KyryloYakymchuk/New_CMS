import { FC } from 'react';
import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FieldProps } from 'formik';

interface IProps extends FieldProps {
    name?: string;
    placeholder?: string;
}

export const WysiwygFormik: FC<IProps> = ({ form, field }) => {
    function setValue(_: Event, editor: ClassicEditor) {
        form.setFieldValue(field.name, editor.getData());
    }
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                //onChange={handleChange}
                onBlur={setValue}
            />
        </div>
    );
};
