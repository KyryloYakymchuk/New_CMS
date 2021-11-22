export enum ProtectedRoutes {
    DASHBOARD = '/',
    USERS = '/users/',
    CREATE_FORM = '/users/createUser',
    EDIT_FORM = '/users/editUser',
    PAGES = '/pages',
    NEWPAGE = '/page/create',
    MODULES = '/modules',
    NEW_MODULE = '/module/create',
    MODULE_FIELDS = '/module/:name/fields/',
    MODULE_FIELDS_CREATE = '/module/:name/fields/create',
    MODULE_FIELD_EDIT = '/module/:name/fields/:title/edit/',
    MODULE_ITEMS = '/:name/items',
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
