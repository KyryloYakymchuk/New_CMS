import i18n from '@utils/helpers/i18n';
import FormCheckbox from '@components/FormField/FormCheckbox';
import FormField from '@components/FormField/FormField';
export const ModuleButtons = [
    { type: 'submit', title: i18n.t('Create'), style: 'pinkButton' },
    {
      type: 'button',
      title: i18n.t('Cancel'),
      style: 'greyButton',
      goBackClick: () => history.back() 
    }
];

export const ModuleFormFields = [
    {
        type: 'text',
        name: 'name',
        label: i18n.t('Module Name'),
        variant:'outlined',
        component:FormField
    },
    {
        type: 'checkbox',
        name: 'categories',
        label: i18n.t('Categories'),
        variant:'standard',
        id:'categories',
        component:FormCheckbox
    }
];
