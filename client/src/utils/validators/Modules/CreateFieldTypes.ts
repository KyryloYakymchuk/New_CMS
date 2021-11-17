import { IFieldSettings } from '@interfaces/types';
import i18n from '@utils/helpers/i18n';
import { onlyLatin, onlyNum, passwordSpacesRE } from '../RegularExpressions';

export const textPromptField = (values: IFieldSettings) => {
    const errors: IFieldSettings = {};
    if (values.title && values.title.length > 30) {
        errors.title = i18n.t('Must have a maximum of 30 characters');
    } else if (!values.title) {
        errors.title = i18n.t('name should not be empty');
    }

    if (!values.name) {
        errors.name = i18n.t('name should not be empty');
    } else if (values.name && passwordSpacesRE.test(values.name)) {
        errors.name = i18n.t('Password must not contain spaces');
    } else if (values.name && !onlyLatin.test(values.name)) {
        errors.name = i18n.t('Only latin');
    } else if (values.name && values.name.length > 30) {
        errors.name = i18n.t('Must have a maximum of 30 characters');
    }

    return errors;
};

export const textboxField = (values: IFieldSettings) => {
    const errors: IFieldSettings = {};
    if (values.title && values.title.length > 30) {
        errors.title = i18n.t('Must have a maximum of 30 characters');
    } else if (!values.title) {
        errors.title = i18n.t('name should not be empty');
    }
    if (!values.name) {
        errors.name = i18n.t('name should not be empty');
    } else if (values.name && passwordSpacesRE.test(values.name)) {
        errors.name = i18n.t('Password must not contain spaces');
    } else if (values.name && !onlyLatin.test(values.name)) {
        errors.name = i18n.t('Only latin');
    } else if (values.name && values.name.length > 30) {
        errors.name = i18n.t('Must have a maximum of 30 characters');
    }

    if (values.maxChars && values.maxChars.length > 30) {
        errors.maxChars = i18n.t('Must have a maximum of 30 characters');
    } else if (values.maxChars && !onlyNum.test(values.maxChars)) {
        errors.maxChars = i18n.t('Only number');
    }
    if (values.defaultText && values.defaultText?.length > 30) {
        errors.defaultText = i18n.t('Must have a maximum of 30 characters');
    }
    return errors;
};

export const uploadField = (values: IFieldSettings) => {
    const errors: IFieldSettings = {};
    if (values.title && values.title.length > 30) {
        errors.title = i18n.t('Must have a maximum of 30 characters');
    } else if (!values.title) {
        errors.title = i18n.t('name should not be empty');
    }
    if (!values.name) {
        errors.name = i18n.t('name should not be empty');
    } else if (values.name && passwordSpacesRE.test(values.name)) {
        errors.name = i18n.t('Password must not contain spaces');
    } else if (values.name && !onlyLatin.test(values.name)) {
        errors.name = i18n.t('Only latin');
    } else if (values.name && values.name.length > 30) {
        errors.name = i18n.t('Must have a maximum of 30 characters');
    }
    if (values.maxItems && !onlyNum.test(values.maxItems)) {
        errors.maxItems = i18n.t('Only number');
    }
    if (values.maxSize && !onlyNum.test(values.maxSize)) {
        errors.maxSize = i18n.t('Only number');
    } else if (!values.maxSize) {
        errors.maxSize = i18n.t('name should not be empty');
    }
    return errors;
};

export const mapField = (values: IFieldSettings) => {
    const errors: IFieldSettings = {};
    if (values.title && values.title.length > 30) {
        errors.title = i18n.t('Must have a maximum of 30 characters');
    } else if (!values.title) {
        errors.title = i18n.t('name should not be empty');
    }
    if (!values.name) {
        errors.name = i18n.t('name should not be empty');
    } else if (values.name && passwordSpacesRE.test(values.name)) {
        errors.name = i18n.t('Password must not contain spaces');
    } else if (values.name && !onlyLatin.test(values.name)) {
        errors.name = i18n.t('Only latin');
    } else if (values.name && values.name.length > 30) {
        errors.name = i18n.t('Must have a maximum of 30 characters');
    }

    if (values.coordinates_x && !onlyNum.test(values.coordinates_x)) {
        errors.coordinates_x = i18n.t('Only number');
    } else if (!values.coordinates_x) {
        errors.coordinates_x = i18n.t('name should not be empty');
    }
    if (values.coordinates_y && !onlyNum.test(values.coordinates_y)) {
        errors.coordinates_y = i18n.t('Only number');
    } else if (!values.coordinates_y) {
        errors.coordinates_y = i18n.t('name should not be empty');
    }

    return errors;
};
