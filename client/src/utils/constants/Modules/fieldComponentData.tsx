import { Field } from 'formik';
import { TextAreaFormik } from '@components/FormField/TextAreaFormik';
import { OnChangeFieldValueType } from '@interfaces/types';
import { MultiSelectFormik } from '@components/FormField/MultiSelectFormik/MultiSelectFormik';
import { parserOption } from '@utils/functions/multiSelectFunction';
import { UploaderFormik } from '@components/FormField/UploaderFormik/UploaderFormik';
import { WysiwygFormik } from '@components/FormField/WysiwygFormik/WysiwygFormik';
import { MapFormik } from '@components/FormField/MapFormik/MapFormik';
import { CheckboxFormik } from '@components/FormField/CheckboxFormik';
import { IModuleFieldsPayload } from '@redux/types/modules';
import FormFieldFormik from '@components/FormField/FormFieldFormik';

export const fieldComponentData = {
    textbox: (item: IModuleFieldsPayload) => (
        <Field
            name={item.settings.name}
            placeholder={item.settings.defaultText || ''}
            label={item.settings.title}
            component={FormFieldFormik}
        />
    ),
    textarea: (item: IModuleFieldsPayload, handleChange?: OnChangeFieldValueType) => (
        <Field
            name={item.settings.name}
            onChange={handleChange}
            placeholder={item?.settings.defaultText || ''}
            component={TextAreaFormik}
        />
    ),
    wysiwyg: (item: IModuleFieldsPayload) => (
        <Field
            name={item.settings.name}
            component={WysiwygFormik}
        />
    ),
    checkbox: (item: IModuleFieldsPayload) => (
        <Field name={item.settings.name} label={item.settings.name} component={CheckboxFormik} />
    ),
    upload: (item: IModuleFieldsPayload) => (
        <Field name={item.settings.name} isMulti={true} component={UploaderFormik} />
    ),
    module: (item: IModuleFieldsPayload) => {
        return (
            <Field
                name={item.name}
                component={MultiSelectFormik}
                isMulti={false}
                //hardcode need back
                options={parserOption( '',  '')}
            />
        );
    },
    dropdown: (item: IModuleFieldsPayload) => {
        return (
            <Field
                name={item.settings.name}
                component={MultiSelectFormik}
                isMulti={false}
                options={parserOption(item.settings.labels || '', item.settings.values || '')}
            />
        );
    },
    datePicker: (item: IModuleFieldsPayload) => (
        <Field
            name={item.settings.name}
            placeholder={item.settings.defaultText || ''}
            type="date"
            label={item.settings.title}
            component={FormFieldFormik}
        />
    ),
    map: (item: IModuleFieldsPayload) => (
        <Field
            name={item.settings.name}
            coordinates={{
                lat: Number(item.settings.coordinates_x),
                lng: Number(item.settings.coordinates_y)
            }}
            // need fix back
            component={MapFormik}
        />
    )
};