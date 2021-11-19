import i18n from '@utils/helpers/i18n';
import {
    mapField,
    modulesField,
    textAreaField,
    textboxField,
    textPromptField,
    uploadField
} from '@utils/validators/Modules/CreateFieldTypes';

export const initialfileds = [
    {
        name: 'Checkbox',
        key: 'text',
        type: 'checkbox',
        fieldType: 'boolean',
        validate: textAreaField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },
            {
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { value: 'false', optionLabel: 'false' },
                    { value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        name: 'TextBox',
        type: 'textbox',
        key: 'text',
        fieldType: 'string',
        validate: textboxField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },
            { name: i18n.t('Max Chars'), key: 'maxChars', defaultValue: '', input: 'px' },
            {
                name: i18n.t('Default Text'),
                key: 'defaultText',
                defaultValue: '',
                input: ''
            },
            {
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { value: 'false', optionLabel: 'false' },
                    { value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        name: 'TextArea',
        type: 'textarea',
        key: 'textarea',
        fieldType: 'string',
        validate: textAreaField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },
            {
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { value: 'false', optionLabel: 'false' },
                    { value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        name: 'Upload File(s)',
        type: 'upload',
        key: 'upload',
        fieldType: 'string',
        validate: uploadField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },
            {
                name: i18n.t('Max Items'),
                key: 'maxItems',
                defaultValue: '',
                input: ''
            },
            { name: i18n.t('Max Size'), key: 'maxSize', defaultValue: '', input: '' },
            {
                name: i18n.t('Filetypes'),
                key: 'fileTypes',
                defaultValue: '',
                input: 'e.g. jpg, png, gif, jpeg',
                select: [
                    { value: 'jpg', optionLabel: 'jpg' },
                    { value: 'png', optionLabel: 'png' },
                    { value: 'jpeg', optionLabel: 'jpeg' },
                    { value: 'txt', optionLabel: 'txt' },
                    { value: 'xls', optionLabel: 'xls' },
                    { value: 'xlsx', optionLabel: 'xlsx' },
                    { value: 'doc', optionLabel: 'doc' },
                    { value: 'docs', optionLabel: 'docs' },
                    { value: 'pdf', optionLabel: 'pdf' }
                ]
            }
        ]
    },
    {
        name: 'Module Data from Items',
        type: 'module',
        key: 'moduleDataFromItems',
        fieldType: 'string',
        validate: modulesField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },

            {
                name: i18n.t('Module'),
                key: 'module',
                defaultValue: 'false',
                select: []
            }
        ]
    },
    {
        name: 'Dropdown',
        type: 'dropdown',
        key: 'dropdown',
        fieldType: 'string',
        validate: textAreaField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },

            {
                name: i18n.t('Names (comma seperated)'),
                key: 'labels',
                defaultValue: '',
                input: ''
            },
            {
                name: i18n.t('Values (comma seperated)'),
                key: 'values',
                defaultValue: '',
                input: ''
            },
            {
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { value: 'false', optionLabel: 'false' },
                    { value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        name: 'WYSIWYG',
        type: 'wysiwyg',
        key: 'wysiwyg',
        fieldType: 'string',
        validate: textPromptField,
        settings: [{ name: i18n.t('Name'), key: 'name' }]
    },
    {
        name: 'Map',
        type: 'map',
        key: 'map',
        fieldType: 'string',
        validate: mapField,
        settings: [
            { name: i18n.t('Name'), key: 'name' },
            {
                name: i18n.t('Coordinates X'),
                key: 'coordinates_x',
                defaultValue: '',
                input: ''
            },
            {
                name: i18n.t('Coordinates Y'),
                key: 'coordinates_y',
                defaultValue: '',
                input: ''
            }
        ]
    }
];
