import { UsersPage } from '@modules/Users/UsersPage';
import { Login } from '@modules/Auth/Login';
import { Register } from '@modules/Auth/Register';
import { ResetPassword } from '@modules/Auth/ResetPassword';
import { Reset } from '@modules/Auth/Reset';

import { AuthRoutes, ProtectedRoutes } from '@utils/enums/RoutesPath';
import { Dashboard } from '@components/Dashboard';
import { Settings } from '@modules/Settings/Settings';
import { CreateUserPage } from '@components/CreateUserPage/CreateUserPage';
//!@info Needs in future pagebuilder
// import { NewPage } from '@modules/Pages/NewPage';
import { AllModules } from '@modules/Modules/AllModules';
import { CreateModule } from '@modules/Modules/CreateModule';
import { AllFields } from '@modules/Modules/AllFields';

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
        title: 'Users'
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
        title: 'Pages'
    }, 
    //!@info Needs in future pagebuilder
    // {
    //     path: ProtectedRoutes.NEWPAGE,
    //     component: NewPage,
    //     title: 'New Page'
    // },
    
    {
        path: ProtectedRoutes.MODULES,
        component: AllModules,
        title: 'All Modules'
    },
    {
        path: ProtectedRoutes.NEW_MODULE,
        component: CreateModule,
        title: 'New Module'
    },
    {
        path: ProtectedRoutes.EDIT_MODULE,
        component: CreateModule,
        title: 'Edit Module'
    },
    {
        path: ProtectedRoutes.MODULE_FIELDS,
        component: AllFields,
        title: 'Module Fields'
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
    { path: AuthRoutes.LOGIN_CONFIRM_EMAIL, component: Login },
    { path: AuthRoutes.REGISTER, component: Register },
    { path: AuthRoutes.RESET, component: Reset },
    { path: AuthRoutes.RESET_PASSWORD, component: ResetPassword }
];
