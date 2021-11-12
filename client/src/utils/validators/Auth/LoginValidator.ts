import i18n from '@utils/helpers/i18n';
import { emailRE } from '../RegularExpressions';

interface ValidatorProps {
    email: string;
    password: string;
}

interface IErrors {
    email?: string;
    password?: string;
}

export const loginValidator = (values: ValidatorProps) => {
    const errors: IErrors = {};
    // EMAIL
    if (!values.email) {
        errors.email = i18n.t('Required');
    }
    if (!emailRE.test(values.email)) {
        errors.email = i18n.t('Invalid email address');
    }

    // PASSWORD
    if (!values.password) {
        errors.password = i18n.t('Required');
    }
    if (/(\s)/g.test(values.password)) {
        errors.password = i18n.t('Password must not contain spaces');
    }
    if (values?.password?.length < 8) {
        errors.password = i18n.t('Minimum 8 characters');
    }
    if (/[^a-zA-Z0-9]/g.test(values.password)) {
        errors.password = i18n.t('Password must not contain cyrillic');
    }

    return errors;
};
