import { AuthRoutes } from '@utils/enums/routes';
import { Icons } from '../icon';

export const RegisterFields = [
    {
        type: 'text',
        name: 'email',
        label: 'Email',
        icon: <Icons.AlternateEmailIcon />
    },
    {
        type: 'password',
        name: 'password',
        label: 'Password',
        icon: <Icons.VpnKeyIcon />
    },
    {
        type: 'password',
        name: 'confirmPassword',
        label: 'Confirm Password',
        icon: <Icons.VpnKeyIcon />
    },
    {
        type: 'text',
        name: 'name',
        label: 'Firstname',
        icon: <Icons.PersonIcon />
    },
    {
        type: 'text',
        name: 'lastname',
        label: 'Lastname',
        icon: <Icons.PersonOutlineIcon />
    },

    {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        icon: <Icons.PhoneIphoneIcon />
    },

    {
        type: 'date',
        name: 'birthday',
        label: 'Birthday',
        icon: <Icons.TodayIcon />
    }
];

export const ButtonsData = {
    buttonIcon: <Icons.AddIcon />,
    buttonText: 'Sign Up',

    linkText: 'Log in',
    description: 'Have an account ?',
    path: AuthRoutes.LOGIN
};

export const MainText = {
    title: 'Create new account',
    description: 'Enter with your data details to create a new account'
};
