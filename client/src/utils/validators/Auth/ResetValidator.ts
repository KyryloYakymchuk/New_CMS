import i18n from '@utils/helpers/i18n';
import { emailRE } from '../RegularExpressions';

interface ValidatorProps {
    email: string;
}

interface IErrors {
    email?: string;
}

export const ResetValidator = (values: ValidatorProps) => {
    const errors: IErrors = {};
    // EMAIL
    if (!values.email) {
        errors.email = i18n.t('Required');
    } else if (!emailRE.test(values.email)) {
        errors.email = i18n.t('Invalid email address');
    }

    return errors;
};
