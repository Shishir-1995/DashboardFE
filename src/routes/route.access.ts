
import { UserRole } from 'modules/user/enum/user-role';
import { routes } from './routes';

export type routesAccessType = {
    role: UserRole;
    access: { routes: string[] };
};

export const routesAccess: routesAccessType[] = [
    {
        role: UserRole.Admin,
        access: {
            routes: [routes.student.root]
        }
    },
    {
        role: UserRole.Student,
        access: {
            routes: [routes.student.root]
        }
    },
    {
        role: UserRole.IA,
        access: {
            routes: []
        }
    }
];
