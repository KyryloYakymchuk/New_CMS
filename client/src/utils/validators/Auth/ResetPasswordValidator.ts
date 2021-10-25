import i18n from '@utils/helpers/i18n';
import { passwordCyrillicRE, passwordSpacesRE } from '../RegularExpressions';

interface ValidatorProps {
    newPassword: string;
    newPasswordConfirm: string;
}

interface IErrors {
    newPassword?: string;
    newPasswordConfirm?: string;
}

export const ResetPasswordValidator = (values: ValidatorProps) => {
    const errors: IErrors = {};

    // PASSWORD
    if (!values.newPassword) {
        errors.newPassword = i18n.t('Required');
    } else if (passwordSpacesRE.test(values.newPassword)) {
        errors.newPassword = i18n.t('Password must not contain spaces');
    } else if (values?.newPassword?.length < 8) {
        errors.newPassword = i18n.t('Minimum 8 characters');
    } else if (passwordCyrillicRE.test(values.newPassword)) {
        errors.newPassword = i18n.t('Password must not contain cyrillic');
    }

    // CONFIRM PASSWORD

    if (!values.newPasswordConfirm) {
        errors.newPasswordConfirm = i18n.t('Required');
    } else if (values.newPassword !== values.newPasswordConfirm) {
        errors.newPasswordConfirm = i18n.t('Passwords must match');
    }

    return errors;
};
