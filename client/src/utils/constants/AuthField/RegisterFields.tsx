import { AuthRoutes } from '@utils/enums/routes';
import { Icons } from '../icon';

export const RegisterFields = [
    {
        type: 'text',
        name: 'email',
        label: 'Email',
        icon: Icons.EmailIcon
    },
    {
        type: 'password',
        name: 'password',
        label: 'Password',
        icon: Icons.PasswordIcon
    },
    {
        type: 'password',
        name: 'confirmPassword',
        label: 'Confirm Password',
        icon: Icons.PasswordIcon
    },
    {
        type: 'text',
        name: 'firstname',
        label: 'Firstname',
        icon: Icons.FirstNameIcon
    },
    {
        type: 'text',
        name: 'lastname',
        label: 'Lastname',
        icon: Icons.LastNameIcon
    },

    {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        icon: Icons.PhoneIcon
    },

    {
        type: 'date',
        name: 'birthday',
        label: 'Birthday',
        icon: Icons.BirthdayIcon
    }
];

export const ButtonsData = {
    buttonIcon: Icons.RegisterIcon,
    buttonText: 'Sign Up',

    linkText: 'Log in',
    description: 'Have an account ?',
    path: AuthRoutes.LOGIN
};

export const MainText = {
    title: 'Create new account',
    description: 'Enter with your data details to create a new account'
};
