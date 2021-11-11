import { AuthRoutes } from '@utils/enums/RoutesPath';
import i18n from '@utils/helpers/i18n';
import { Icons } from '../icon';

export const RegisterFields = [
    {
        type: 'text',
        name: 'email',
        label: `*${i18n.t('Email')}`,
        icon: <Icons.AlternateEmailIcon />
    },
    {
        type: 'password',
        name: 'password',
        label: `*${i18n.t('Password')}`,
        icon: <Icons.VpnKeyIcon />
    },
    {
        type: 'password',
        name: 'confirmPassword',
        label: `*${i18n.t('Confirm Password')}`,
        icon: <Icons.VpnKeyIcon />
    },
    {
        type: 'text',
        name: 'firstname',
        label: `*${i18n.t('Firstname')}`,
        icon: <Icons.PersonIcon />
    },
    {
        type: 'text',
        name: 'lastname',
        label: i18n.t('Lastname'),
        icon: <Icons.PersonOutlineIcon />
    },

    {
        type: 'text',
        name: 'phone',
        label: i18n.t('Phone Number'),
        icon: <Icons.PhoneIphoneIcon />
    },

    {
        type: 'date',
        name: 'birthday',
        label: i18n.t('Birthday'),
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
