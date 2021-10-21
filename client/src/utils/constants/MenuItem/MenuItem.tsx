import { ProtectedRoutes } from '@utils/enums/routes';
import { Icons } from './icon';

export const MenuItem = [
    {
        name: 'Home Page',
        path: ProtectedRoutes.DASHBOARD,
        icon: Icons.DashboardIcon,
        itemId: 1
    },
    {
        name: 'Users',
        icon: Icons.UsersIcon,
        itemId: 2,
        path: ProtectedRoutes.USERS
    },
    {
        name: 'Pages',
        icon: Icons.PagesIcon,
        itemId: 3,
        height: '180px',
        subitems: [
            { subName: 'All Pages', subPath: '/pages/list' },
            { subName: 'New Pages', subPath: '/Pages/add' },
            { subName: 'Edit Page', subPath: '/pagebuilder' }
        ]
    },
    {
        name: 'Modules',
        icon: Icons.ModulesIcon,
        itemId: 4,
        height: '130px',
        subitems: [
            { subName: 'All Modules', subPath: '/modules/list' },
            { subName: 'New Module', subPath: '/modules/add' }
        ]
    },
    {
        name: 'Groups',
        icon: Icons.GroupsIcon,
        itemId: 5,
        height: '130px',
        subitems: [
            { subName: 'All Groups', subPath: '/groups/list' },
            { subName: 'New Group', subPath: '/groups/add' }
        ]
    },
    {
        name: 'Newsletter',
        icon: Icons.NewsletterIcon,
        itemId: 6,
        height: '225px',
        subitems: [
            { subName: 'All Letter', subPath: '/letter/list' },
            { subName: 'New Letter', subPath: '/letter/add' },
            { subName: 'New Jobs', subPath: '/jobs/list' },
            { subName: 'New Jobs', subPath: '/jobs/add' }
        ]
    },
    {
        name: 'Webshop',
        icon: Icons.WebshopIcon,
        itemId: 7,
        height: '225px',
        subitems: [
            { subName: 'Categories', subPath: '/webshop/categories/list' },
            { subName: 'All Fields', subPath: '/webshop/fields/list' },
            { subName: 'All Items', subPath: '/webshop/items/list' },
            { subName: 'All Orders', subPath: '/webshop/orders/list' }
        ]
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: Icons.SettingsIcon,
        itemId: 8
    }
];

export const style = {
    backgroundColor: '#f03254',
    color: 'white'
};
