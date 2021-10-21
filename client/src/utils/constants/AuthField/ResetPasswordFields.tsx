import { AuthRoutes } from '@utils/enums/routes';
import { Icons } from '../MenuItem/icon';

export const ResetPasswordFields = [
    {
        type: 'password',
        name: 'newPassword',
        label: 'Password',
        icon: Icons.PasswordIcon
    },
    {
        type: 'password',
        name: 'newPasswordConfirm',
        label: 'Confirm Password',
        icon: Icons.PasswordIcon
    }
];

export const ButtonsData = {
    buttonIcon: Icons.RefreshIcon,
    buttonText: 'Reset Password',

    linkText: 'Log in',
    description: 'Have an account ? ',
    path: AuthRoutes.LOGIN
};

export const MainText = {
    title: 'Reset Password',
    description: 'To reset your password Enter new password'
};
