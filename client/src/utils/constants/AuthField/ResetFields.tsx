import { AuthRoutes } from '@utils/enums/RoutesPath';
import i18n from '@utils/helpers/i18n';
import { Icons } from '../icon';

export const ResetFields = [
    {
        type: 'text',
        name: 'email',
        label: i18n.t('Email'),
        icon: <Icons.AlternateEmailIcon />
    }
];

export const ButtonsData = {
    buttonIcon: <Icons.EmailIcon />,
    buttonText: 'Send email',

    linkText: 'Log in',
    description: 'Have an account ?',
    path: AuthRoutes.LOGIN
};

export const MainText = {
    title: 'Reset Password',
    description: 'To reset your password enter your email'
};
