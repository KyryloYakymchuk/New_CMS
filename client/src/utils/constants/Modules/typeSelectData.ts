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
        id: 0,
        name: 'Checkbox',
        key: 'text',
        type: 'checkbox',
        fieldType: 'boolean',
        validate: textAreaField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },
            {
                id: 1,
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { id: 0, value: 'false', optionLabel: 'false' },
                    { id: 1, value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        id: 1,
        name: 'TextBox',
        type: 'textbox',
        key: 'text',
        fieldType: 'string',
        validate: textboxField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },
            { id: 1, name: i18n.t('Max Chars'), key: 'maxChars', defaultValue: '', input: 'px' },
            {
                id: 2,
                name: i18n.t('Default Text'),
                key: 'defaultText',
                defaultValue: '',
                input: ''
            },
            {
                id: 3,
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { id: 0, value: 'false', optionLabel: 'false' },
                    { id: 1, value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'TextArea',
        type: 'textarea',
        key: 'textarea',
        fieldType: 'string',
        validate: textAreaField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },
            {
                id: 1,
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { id: 0, value: 'false', optionLabel: 'false' },
                    { id: 1, value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Upload File(s)',
        type: 'upload',
        key: 'upload',
        fieldType: 'string',
        validate: uploadField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },
            {
                id: 1,
                name: i18n.t('Max Items'),
                key: 'maxItems',
                defaultValue: '',
                input: ''
            },
            { id: 2, name: i18n.t('Max Size'), key: 'maxSize', defaultValue: '', input: '' },
            {
                id: 3,
                name: i18n.t('Filetypes'),
                key: 'fileTypes',
                defaultValue: '',
                input: 'e.g. jpg, png, gif, jpeg',
                select: [
                    { id: 0, value: 'jpg', optionLabel: 'jpg' },
                    { id: 1, value: 'png', optionLabel: 'png' },
                    { id: 2, value: 'jpeg', optionLabel: 'jpeg' },
                    { id: 3, value: 'txt', optionLabel: 'txt' },
                    { id: 4, value: 'xls', optionLabel: 'xls' },
                    { id: 5, value: 'xlsx', optionLabel: 'xlsx' },
                    { id: 6, value: 'doc', optionLabel: 'doc' },
                    { id: 7, value: 'docs', optionLabel: 'docs' },
                    { id: 8, value: 'pdf', optionLabel: 'pdf' }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Module Data from Items',
        type: 'module',
        key: 'moduleDataFromItems',
        fieldType: 'string',
        validate: modulesField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },

            {
                id: 1,
                name: i18n.t('Module'),
                key: 'module',
                defaultValue: 'false',
                select: []
            }
        ]
    },
    {
        id: 5,
        name: 'Dropdown',
        type: 'dropdown',
        key: 'dropdown',
        fieldType: 'string',
        validate: textAreaField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },

            {
                id: 1,
                name: i18n.t('Names (comma seperated)'),
                key: 'labels',
                defaultValue: '',
                input: ''
            },
            {
                id: 2,
                name: i18n.t('Values (comma seperated)'),
                key: 'values',
                defaultValue: '',
                input: ''
            },
            {
                id: 3,
                name: i18n.t('Required'),
                key: 'required',
                defaultValue: 'false',
                select: [
                    { id: 0, value: 'false', optionLabel: 'false' },
                    { id: 1, value: 'true', optionLabel: 'true' }
                ]
            }
        ]
    },
    {
        id: 6,
        name: 'WYSIWYG',
        type: 'wysiwyg',
        key: 'wysiwyg',
        fieldType: 'string',
        validate: textPromptField,
        settings: [{ id: 0, name: i18n.t('Name'), key: 'name' }]
    },
    {
        id: 7,
        name: 'Map',
        type: 'map',
        key: 'map',
        fieldType: 'string',
        validate: mapField,
        settings: [
            { id: 0, name: i18n.t('Name'), key: 'name' },
            {
                id: 1,
                name: i18n.t('Coordinates X'),
                key: 'coordinates_x',
                defaultValue: '',
                input: ''
            },
            {
                id: 2,
                name: i18n.t('Coordinates Y'),
                key: 'coordinates_y',
                defaultValue: '',
                input: ''
            }
        ]
    }
];
