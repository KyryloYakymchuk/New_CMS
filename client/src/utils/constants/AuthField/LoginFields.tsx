import { AuthRoutes } from '@utils/enums/routes';
import { Icons } from '../icon';

export const LoginFields = [
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
    title: 'Hello ! Welcome back.',
    description: 'Log in with your data that you entered during Your registrarion'
};
