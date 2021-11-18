import i18n from '@utils/helpers/i18n';
import { emailRE, passwordMatch, passwordSpacesRE } from '../RegularExpressions';

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
    } else if (passwordSpacesRE.test(values.password)) {
        errors.password = i18n.t('Password must not contain spaces');
    } else if (values?.password?.length < 8) {
        errors.password = i18n.t('Minimum 8 characters');
    } else if (!values.password.match(passwordMatch)) {
        errors.password = i18n.t('One letter, one number, only latin, and one special character');
    }

    return errors;
};
