import { emailRE } from '../RegularExpressions';

interface ValidatorProps {
    email: string;
    password: string;
}

interface IErrors {
    email?: string;
    password?: string;
}

export const LoginValidator = (values: ValidatorProps) => {
    const errors: IErrors = {};
    // EMAIL
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!emailRE.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // PASSWORD
    if (!values.password) {
        errors.password = 'Required';
    }
    if (/(\s)/g.test(values.password)) {
        errors.password = 'Password must not contain spaces';
    }
    if (values?.password?.length < 8) {
        errors.password = 'Minimum 8 characters';
    }
    if (/[^a-zA-Z0-9]/g.test(values.password)) {
        errors.password = 'Password must not contain cyrillic';
    }

    return errors;
};
