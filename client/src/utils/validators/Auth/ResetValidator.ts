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
        errors.email = 'Required';
    } else if (!emailRE.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
