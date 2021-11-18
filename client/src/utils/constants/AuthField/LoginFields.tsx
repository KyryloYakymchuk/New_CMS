import { AuthRoutes } from '@utils/enums/RoutesPath';
import i18n from '@utils/helpers/i18n';
import { Icons } from '../icon';

export const LoginFields = [
    {
        type: 'text',
        name: 'email',
        label: i18n.t('Email'),
        icon: <Icons.AlternateEmailIcon />
    },
    {
        type: 'password',
        name: 'password',
        label: i18n.t('Password'),
        icon: <Icons.VpnKeyIcon />
    }
];

export const ButtonsData = {
    buttonIcon: <Icons.LockOpenIcon />,
    buttonText: 'Sign In',
    linkText: 'Register',
    description: 'Don`t have an account ?',
    path: AuthRoutes.REGISTER
};

export const MainText = {
    title: 'Welcome!',
    description: 'Log in with your data that you entered during Your registrarion'
};
