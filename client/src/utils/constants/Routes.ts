import { UsersPage } from '@modules/Users/UsersPage';
import { Login } from '@modules/Auth/Login';
import { Register } from '@modules/Auth/Register';
import { ResetPassword } from '@modules/Auth/ResetPassword';
import { Reset } from '@modules/Auth/Reset';

import { AuthRoutes, ProtectedRoutes } from '@utils/enums/routes';
import { Test } from '@components/Test';

// Main components
export const protectedRoutes = [
    {
        path: ProtectedRoutes.DASHBOARD,
        component: Test,
        title: 'Dashboard'

    },
    {
        path: ProtectedRoutes.USERS,
        component: UsersPage,
        title: 'Users'
    },
    {
        path: ProtectedRoutes.PAGES,
        component:Test,
        title: 'Pages'
    },
    {
        path: ProtectedRoutes.MODULES,
        component:Test,
        title: 'Modules'
    },
    {
        path: ProtectedRoutes.GROUPS,
        component: Test,
        title: 'Groups'
    },
    {
        path: ProtectedRoutes.NEWSLETTER,
        component: Test,
        title: 'Newsletter'
    },
    {
        path: ProtectedRoutes.WEBSHOP,
        component: Test,
        title: 'Webshop'
    },
    {
        path: ProtectedRoutes.SETTINGS,
        component: Test,
        title: 'Settings'
    }
];

// Auth components
export const routes = [
    { path: AuthRoutes.LOGIN, component: Login },
    { path: AuthRoutes.REGISTER, component: Register },
    { path: AuthRoutes.RESET, component: Reset },
    { path: AuthRoutes.RESET_PASSWORD, component: ResetPassword }
];
