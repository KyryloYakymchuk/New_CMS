import { ProtectedRoutes } from '@utils/enums/routes';

import { Icons } from '../icon';

export const MenuItem = [
    {
        name: 'Dashboard',
        path: ProtectedRoutes.DASHBOARD,
        icon: <Icons.DashboardIcon />,
        itemId: 1
    },
    {
        name: 'Users',
        icon: <Icons.PersonIcon />,
        itemId: 2,
        path: ProtectedRoutes.USERS
    },
    {
        name: 'Pages',
        icon: <Icons.StickyNote2Icon />,
        itemId: 3,
        height: '180px',
        subItems: [
            { subName: 'All Pages', subPath: '/' },
            { subName: 'New Pages', subPath: '/' },
            { subName: 'Edit Page', subPath: '/' }
        ]
    },
    {
        name: 'Modules',
        icon: <Icons.AccountTreeIcon />,
        itemId: 4,
        height: '130px',
        path: ProtectedRoutes.MODULES
    },
    {
        name: 'Groups',
        icon: <Icons.GroupsIcon />,
        itemId: 5,
        height: '130px',
        path: ProtectedRoutes.GROUPS
    },
    {
        name: 'Newsletter',
        icon: <Icons.MenuBookIcon />,
        itemId: 6,
        height: '130px',
        subitems: [
            { subName: 'All Letter', subPath: '/' },
            { subName: 'All Jobs', subPath: '/' }
        ]
    },
    {
        name: 'Webshop',
        icon: <Icons.StorefrontIcon />,
        itemId: 7,
        height: '225px',
        subItems: [
            { subName: 'Categories', subPath: '/' },
            { subName: 'All Fields', subPath: '/' },
            { subName: 'All Items', subPath: '/' },
            { subName: 'All Orders', subPath: '/' }
        ]
    },
    {
        name: 'Settings',
        path: ProtectedRoutes.SETTINGS,
        icon: <Icons.SettingsIcon />,
        itemId: 8
    }
];
