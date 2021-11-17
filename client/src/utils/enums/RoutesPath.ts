export enum ProtectedRoutes {
    DASHBOARD = '/',
    USERS = '/users/',
    CREATE_FORM = '/users/createUser',
    EDIT_FORM = '/users/editUser',
    PAGES = '/pages',
    NEWPAGE = '/page/create',
    MODULES = '/modules',
    NEW_MODULE = '/module/create',
    MODULE_FIELDS = '/module/fields/:name',
    MODULE_FIELDS_CREATE = '/module/:name/fields/create',
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
