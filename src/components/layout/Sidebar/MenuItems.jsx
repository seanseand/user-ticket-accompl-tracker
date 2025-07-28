import { useNavigate, useLocation } from 'react-router';

/**
 * Disclaimer:
 * Due to the strict time frame this function is made to determine the user role.
 * It is not the best practice to determine user roles.
 * It is recommended to use a more robust authentication and authorization system.
 * This is a temporary solution to get the user role based on the current URL path.
 */

function getUserRole (){
    const currentLocation = useLocation();
    const pathname = currentLocation.pathname;
    if (pathname.includes('/Admin')) {
        return 'admin';
    } else {
        return 'user';
    }
}

function useMenuItems() {
    const navigate = useNavigate();
    const userRole = getUserRole();

    const adminItems = [
        {
            key: 'log-time',
            label: 'Log Time',
            path: '/Admin/AccomplishmentLog/log-time',
            onClick: () => navigate('/Admin/AccomplishmentLog/log-time'),
        },
        {
            key: 'accomplishment-logs',
            label: 'Accomplishment Logs',
            path: '/Admin/AccomplishmentLog/accomplishment-logs',
            onClick: () => navigate('/Admin/AccomplishmentLog/accomplishment-logs'),
        }
    ];

    const userItems = [
        {
            key: 'log-time',
            label: 'Log Time',
            path: '/AccomplishmentLog/log-time',
            onClick: () => navigate('/AccomplishmentLog/log-time'),
        },
        {
            key: 'accomplishment-logs',
            label: 'Accomplishment Logs',
            path: '/AccomplishmentLog/accomplishment-logs',
            onClick: () => navigate('/AccomplishmentLog/accomplishment-logs'),
        }
    ];

    switch (userRole) {
        case 'admin':
            return adminItems;
        case 'user':
            return userItems;
        default:
            return [];
    }
}

export default useMenuItems;
