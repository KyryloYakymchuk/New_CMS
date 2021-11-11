import i18n from '@utils/helpers/i18n';

export const UserFormFields = [
    {
        type: 'text',
        name: 'name',
        label: i18n.t('Name'),
        icon: null
    },
    {
        type: 'text',
        name: 'email',
        label: i18n.t('Email'),
        icon: null
    },
    {
        type: 'text',
        name: 'lastname',
        label: i18n.t('Last name'),
        icon: null
    },
    {
        type: 'password',
        name: 'password',
        label: i18n.t('Password'),
        icon: null
    },
    {
        type: 'text',
        name: 'phone',
        label: i18n.t('Phone Number'),
        icon: null
    },
    {
        type: 'password',
        name: 'confirmPassword',
        label: i18n.t('Confirm Password'),
        icon: null
    },
    {
        type: 'date',
        name: 'birthday',
        label: i18n.t('Birthday'),
        icon: null
    }
];
