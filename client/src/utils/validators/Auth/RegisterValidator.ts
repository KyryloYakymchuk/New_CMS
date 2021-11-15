import i18n from '@utils/helpers/i18n';
import { emailRE, passwordMatch, passwordSpacesRE } from '../RegularExpressions';

interface ValidatorProps {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
}

interface IErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
}

export const registerValidator = (values: ValidatorProps) => {
    const errors: IErrors = {};
    // EMAIL
    if (!values.email) {
        errors.email = i18n.t('Required');
    } else if (!emailRE.test(values.email)) {
        errors.email = i18n.t('Invalid email address');
    }
    // PASSWORD
    if (!values.password) {
        errors.password = i18n.t('Required');
    } else if (passwordSpacesRE.test(values.password)) {
        errors.password = i18n.t('Password must not contain spaces');
    } else if (values?.password?.length < 8) {
        errors.password = i18n.t('Minimum 8 symbols');
    } else if (!values.password.match(passwordMatch)){
            errors.password =
            i18n.t('One letter, one number, only latin, and one special character');
        }
    // CONFIRM PASSWORD
    if (!values.confirmPassword) {
        errors.confirmPassword = i18n.t('Required');
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = i18n.t('Passwords must match');
    }
    // first name
    if (!values.firstname) {
        errors.firstname = i18n.t('Required');
    } else if (values?.firstname?.length > 30) {
        errors.firstname = i18n.t('Must have a maximum of 30 characters');
    } else if (!values.firstname.match('^[a-zA-Z]+$')) {
        errors.firstname = i18n.t('The first name must contain only letters');
    } else if (!values.firstname.match(/^[A-Z]/)) {
        errors.firstname = i18n.t('First letter must be in upper case');
    }
    //last name
    if (values?.lastname) {
        if (values?.lastname?.length > 30) {
            errors.lastname = i18n.t('Must have a maximum of 30 characters');
        } else if (!values?.lastname?.match('^[a-zA-Z]+$')) {
            errors.lastname = i18n.t('The last name must contain only letters');
        } else if (!values?.lastname?.match(/^[A-Z]/)) {
            errors.lastname = i18n.t('First letter must be in upper case');
        }
    }
    // Phone
    if (values?.phone) {
        if (values?.phone?.match(/[^0-9]/)) {
            errors.phone = i18n.t('The phone number must contain only numbers');
        } else if (!values?.phone?.match(/^\+?\d[0-9]{9,15}$/)) {
            errors.phone = i18n.t('Invalid Phone!');
        }
    }
    // BirthDay
    if (values?.birthday) {
        if (new Date(values?.birthday) >= new Date(Date.now())) {
            errors.birthday = i18n.t('Wrong date');
        } else if (new Date(values?.birthday) < new Date('1910-01-01')) {
            errors.birthday = i18n.t('Wrong date');
        }
    }
    return errors;
};
