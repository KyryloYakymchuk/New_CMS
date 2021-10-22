import { ProtectedRoutes } from '@utils/enums/routes';
import { Icons } from '../icon';

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
            { subName: 'All Pages', subPath:'/'  },
            { subName: 'New Pages', subPath:'/'  },
            { subName: 'Edit Page', subPath:'/' }
        ]
    },
    {
        name: 'Modules',
        icon: Icons.ModulesIcon,
        itemId: 4,
        height: '130px',
        subitems: [
            { subName: 'All Modules', subPath:'/'  },
            { subName: 'New Module', subPath:'/'  }
        ]
    },
    {
        name: 'Groups',
        icon: Icons.GroupsIcon,
        itemId: 5,
        height: '130px',
        subitems: [
            { subName: 'All Groups', subPath:'/'  },
            { subName: 'New Group', subPath:'/'  }
        ]
    },
    {
        name: 'Newsletter',
        icon: Icons.NewsletterIcon,
        itemId: 6,
        height: '225px',
        subitems: [
            { subName: 'All Letter', subPath:'/'  },
            { subName: 'New Letter', subPath:'/'  },
            { subName: 'New Jobs', subPath:'/'  },
            { subName: 'New Jobs', subPath:'/'  }
        ]
    },
    {
        name: 'Webshop',
        icon: Icons.WebshopIcon,
        itemId: 7,
        height: '225px',
        subitems: [
            { subName: 'Categories', subPath:'/'  },
            { subName: 'All Fields', subPath:'/'  },
            { subName: 'All Items', subPath:'/'  },
            { subName: 'All Orders', subPath:'/'  }
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
