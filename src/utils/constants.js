const HOME_ROUTE = '/';
const LOGIN_ROUTE = `${ HOME_ROUTE }login`;
const ADMIN_ROUTE = `${ HOME_ROUTE }admin`;
const NO_PERMISSON = `${ HOME_ROUTE }access_denied`;
const NOT_FOUND = `${ HOME_ROUTE }404`;

const USER_ROLES = {
    ADMIN: 'Admin',
    USER: 'User'
};
const PATHS = {
    HOME_ROUTE,
    LOGIN_ROUTE,
    ADMIN_ROUTE,
    NO_PERMISSON,
    NOT_FOUND
};
const PERMISSIONS = {
    ADMIN: {
        ROUTES: [ HOME_ROUTE, ADMIN_ROUTE ]
    },
    USER: {
        ROUTES: [ HOME_ROUTE ]
    }
};

export default { USER_ROLES, PERMISSIONS, PATHS };
