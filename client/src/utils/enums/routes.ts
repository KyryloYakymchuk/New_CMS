export enum ProtectedRoutes {
    DASHBOARD = '/',
    USERS = '/users/:page',
    PAGES = '/pages',
    CREATE_FORM = '/pages/createUser',
    EDIT_FORM = '/pages/editUser',
    MODULES = '/modules',
    GROUPS = '/groups',
    NEWSLETTER = '/newsletter',
    WEBSHOP = '/webshop',
    SETTINGS = '/settings'
}

export enum AuthRoutes {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    RESET = '/auth/reset',
    RESET_PASSWORD = '/auth/resetPassword/:token'
}
