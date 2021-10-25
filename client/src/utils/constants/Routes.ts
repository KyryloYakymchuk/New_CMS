import { UsersPage } from '@modules/Users/UsersPage';
import { Login } from '@modules/Auth/Login';
import { Register } from '@modules/Auth/Register';
import { ResetPassword } from '@modules/Auth/ResetPassword';
import { Reset } from '@modules/Auth/Reset';

import { AuthRoutes, ProtectedRoutes } from '@utils/enums/routes';
import { Dashboard } from '@components/Dashboard';
import { Settings } from '@modules/Settings/Settings';

// Main components
export const protectedRoutes = [
    {
        path: ProtectedRoutes.DASHBOARD,
        component: Dashboard,
        title: 'Dashboard'

    },
    {
        path: ProtectedRoutes.USERS,
        component: UsersPage,
        title: 'Users'
    },
    {
        path: ProtectedRoutes.PAGES,
        component: Dashboard,
        title: 'Pages'
    },
    {
        path: ProtectedRoutes.MODULES,
        component: Dashboard,
        title: 'Modules'
    },
    {
        path: ProtectedRoutes.GROUPS,
        component: Dashboard,
        title: 'Groups'
    },
    {
        path: ProtectedRoutes.NEWSLETTER,
        component: Dashboard,
        title: 'Newsletter'
    },
    {
        path: ProtectedRoutes.WEBSHOP,
        component: Dashboard,
        title: 'Webshop'
    },
    {
        path: ProtectedRoutes.SETTINGS,
        component: Settings,
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
