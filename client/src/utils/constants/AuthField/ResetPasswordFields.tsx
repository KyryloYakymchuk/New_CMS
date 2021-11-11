import { AuthRoutes } from '@utils/enums/RoutesPath';
import { Icons } from '../icon';

export const ResetPasswordFields = [
    {
        type: 'password',
        name: 'newPassword',
        label: 'Password',
        icon: <Icons.VpnKeyIcon />
    },
    {
        type: 'password',
        name: 'newPasswordConfirm',
        label: 'Confirm Password',
        icon: <Icons.VpnKeyIcon />
    }
];

export const ButtonsData = {
    buttonIcon: <Icons.RefreshIcon />,
    buttonText: 'Reset Password',

    linkText: 'Log in',
    description: 'Have an account ? ',
    path: AuthRoutes.LOGIN
};

export const MainText = {
    title: 'Reset Password',
    description: 'To reset your password Enter new password'
};
