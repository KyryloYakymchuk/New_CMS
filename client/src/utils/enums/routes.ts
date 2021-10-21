export enum ProtectedRoutes {
    DASHBOARD = '/',
    USERS = '/users/list',
    PAGES = '/pages/list',
    MODULES = '/modules/list',
    GROUPS = '/groups/list',
    NEWSLETTER = '/newsletter/list',
    WEBSHOP = '/webshop/list',
    SETTINGS = '/settings/list'
}

export enum AuthRoutes {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    RESET = '/auth/reset',
    RESET_PASSWORD = '/auth/resetPassword/:token'
}
