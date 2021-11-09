import { UsersPage } from '@modules/Users/UsersPage';
import { Login } from '@modules/Auth/Login';
import { Register } from '@modules/Auth/Register';
import { ResetPassword } from '@modules/Auth/ResetPassword';
import { Reset } from '@modules/Auth/Reset';

import { AuthRoutes, ProtectedRoutes } from '@utils/enums/routes';
import { Dashboard } from '@components/Dashboard';
import { Settings } from '@modules/Settings/Settings';
import { CreateUserPage } from '@components/CreateUserPage/CreateUserPage';

// Main components
export const protectedRoutes = [
    {
        path: ProtectedRoutes.DASHBOARD,
        component: Dashboard,
        title: 'Dashboard',
        exact: true
    },
    {
        path: ProtectedRoutes.USERS,
        component: UsersPage,
        title: 'Users',
        exact: true
    },
    {
        path: ProtectedRoutes.CREATE_FORM,
        component: CreateUserPage,
        title: 'Create User',
        exact: true
    },
    {
        path: ProtectedRoutes.EDIT_FORM,
        component: CreateUserPage,
        title: 'Edit User',
        exact: true
    },
    {
        path: ProtectedRoutes.PAGES,
        component: Dashboard,
        title: 'Pages',
        exact: true
    },
    {
        path: ProtectedRoutes.MODULES,
        component: Dashboard,
        title: 'Modules',
        exact: true
    },
    {
        path: ProtectedRoutes.GROUPS,
        component: Dashboard,
        title: 'Groups',
        exact: true
    },
    {
        path: ProtectedRoutes.NEWSLETTER,
        component: Dashboard,
        title: 'Newsletter',
        exact: true
    },
    {
        path: ProtectedRoutes.WEBSHOP,
        component: Dashboard,
        title: 'Webshop',
        exact: true
    },
    {
        path: ProtectedRoutes.SETTINGS,
        component: Settings,
        title: 'Settings',
        exact: true
    }
];

// Auth components
export const routes = [
    { path: AuthRoutes.LOGIN, component: Login },
    { path: AuthRoutes.REGISTER, component: Register },
    { path: AuthRoutes.RESET, component: Reset },
    { path: AuthRoutes.RESET_PASSWORD, component: ResetPassword }
];
