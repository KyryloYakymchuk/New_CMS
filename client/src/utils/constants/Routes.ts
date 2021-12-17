import { UsersPage } from '@modules/Users/UsersPage';
import { Login } from '@modules/Auth/Login';
import { Register } from '@modules/Auth/Register';
import { ResetPassword } from '@modules/Auth/ResetPassword';
import { Reset } from '@modules/Auth/Reset';

import { AuthRoutes, ProtectedRoutes } from '@utils/enums/RoutesPath';
import { Dashboard } from '@components/Dashboard';
import { Settings } from '@modules/Settings/Settings';
import { CreateUserPage } from '@components/CreateUserPage/CreateUserPage';

import { AllModules } from '@modules/Modules/AllModules';
import { CreateModule } from '@modules/Modules/CreateModule';
import { AllFields } from '@modules/Modules/AllFields';
import { CreateField } from '@modules/Modules/CreateField';
import { AllItems } from '@modules/Modules/AllItems';
import { Tickets } from '@modules/Tickets/Tickets';
import { TicketPage } from '@modules/Tickets/TicketPage';
import { CreateTicket } from '@modules/Tickets/CreateTicket';

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
        title: 'Pages'
    },
    {
        path: ProtectedRoutes.MODULES,
        component: AllModules,
        title: 'All Modules',
        exact: true
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
        title: 'Module Fields',
        exact: true
    },
    {
        path: ProtectedRoutes.MODULE_FIELDS_CREATE,
        component: CreateField,
        title: 'Create Field Module'
    },
    {
        path: ProtectedRoutes.MODULE_FIELD_EDIT,
        component: CreateField,
        title: 'Edit Field Module'
    },
    {
        path: ProtectedRoutes.MODULE_ITEMS,
        component: AllItems,
        title: 'Module Items'
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
        path: ProtectedRoutes.TICKETS,
        component: Tickets,
        title: 'Tickets',
        exact: true
    },
    {
        path: ProtectedRoutes.TICKET,
        component: TicketPage,
        title: 'Ticket Information',
        exact: true
    },
    {
        path: ProtectedRoutes.CREATE_TICKET,
        component: CreateTicket,
        title: 'Create Ticket',
        exact: true
    },
    {
        path: ProtectedRoutes.SETTINGS,
        component: Settings,
        title: 'Settings'
    }
];

export const routes = [
    { path: AuthRoutes.LOGIN, component: Login },
    { path: AuthRoutes.LOGIN_CONFIRM_EMAIL, component: Login },
    { path: AuthRoutes.REGISTER, component: Register },
    { path: AuthRoutes.RESET, component: Reset },
    { path: AuthRoutes.RESET_PASSWORD, component: ResetPassword }
];
