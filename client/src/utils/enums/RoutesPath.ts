export enum ProtectedRoutes {
    DASHBOARD = '/',
    USERS = '/users/',
    PAGES = '/pages',
    CREATE_FORM = '/pages/createUser',
    EDIT_FORM = '/pages/editUser',
    NEWPAGE = '/page/create',
    MODULES = '/modules',
    NEW_MODULE = '/module/create',
    MODULE_FIELDS = '/module/fields/:name',
    EDIT_MODULE = '/module/edit/:name',
    GROUPS = '/groups',
    NEWSLETTER = '/newsletter',
    WEBSHOP = '/webshop',
    SETTINGS = '/settings'
}

export enum AuthRoutes {
    LOGIN = '/auth/login',
    LOGIN_CONFIRM_EMAIL = '/auth/login/:token',
    REGISTER = '/auth/register',
    RESET = '/auth/reset',
    RESET_PASSWORD = '/auth/resetPassword/:token'
}
