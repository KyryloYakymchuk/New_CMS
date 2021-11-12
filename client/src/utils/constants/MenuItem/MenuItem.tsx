import { ProtectedRoutes } from '@utils/enums/RoutesPath';

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
            { subName: 'All Pages', subPath:ProtectedRoutes.DASHBOARD  },
            { subName: 'New Page', subPath:ProtectedRoutes.NEWPAGE },
            { subName: 'Edit Page', subPath:ProtectedRoutes.DASHBOARD }
        ]
    },
    {
        name: 'Modules',
        icon: <Icons.AccountTreeIcon />,
        itemId: 4,
        height: '130px',
        subItems: [
            { subName: 'All Modules', subPath:ProtectedRoutes.MODULES  },
            { subName: 'New Module', subPath:ProtectedRoutes.NEW_MODULE }
        ]
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
        subItems: [
            { subName: 'All Letter', subPath:ProtectedRoutes.DASHBOARD  },
            { subName: 'All Jobs', subPath:ProtectedRoutes.DASHBOARD  }
        ]
    },
    {
        name: 'Webshop',
        icon: <Icons.StorefrontIcon />,
        itemId: 7,
        height: '225px',
        subItems: [
            { subName: 'Categories', subPath: ProtectedRoutes.DASHBOARD },
            { subName: 'All Fields', subPath: ProtectedRoutes.DASHBOARD },
            { subName: 'All Items', subPath: ProtectedRoutes.DASHBOARD },
            { subName: 'All Orders', subPath: ProtectedRoutes.DASHBOARD }
        ]
    },
    {
        name: 'Settings',
        path: ProtectedRoutes.SETTINGS,
        icon: <Icons.SettingsIcon />,
        itemId: 8
    }
];
