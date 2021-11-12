import i18n from '@utils/helpers/i18n';

interface ValidatorProps {
    name?: string;
}

interface IErrors {
    name?: string;
}

export const createModuleValidate = (values: ValidatorProps) => {
    const errors: IErrors = {};
    if (values.name && values.name.length > 30) {
        errors.name = i18n.t('Must have a maximum of 30 characters');
    }
    if (!values.name){
        errors.name = i18n.t('name should not be empty');
    }
    return errors;
};